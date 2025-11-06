import path from "node:path";
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import type { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import { mdxComponents } from "@/components/mdx/mdx-components";
import {
  workFrontmatterSchema,
  pageFrontmatterSchema,
  workDetailsSchema,
  type WorkFrontmatter,
  type PageFrontmatter,
  type WorkSummary,
} from "@/lib/schemas";

const worksDirectory = path.join(process.cwd(), "content", "works");
const pagesDirectory = path.join(process.cwd(), "content", "pages");

export async function getWorkSlugs(): Promise<string[]> {
  const entries = await readdir(worksDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

export async function getWorkSummary(slug: string): Promise<WorkSummary | undefined> {
  try {
    const filePath = path.join(worksDirectory, `${slug}.mdx`);
    const source = await readFile(filePath, "utf8");
    const { data } = matter(source);
    const frontmatter = workFrontmatterSchema.parse(data);

    return {
      slug,
      title: frontmatter.title,
      year: frontmatter.year,
      type: frontmatter.type,
      excerpt: frontmatter.excerpt,
      tags: frontmatter.tags,
      summary: frontmatter.summary ?? frontmatter.excerpt,
      readingTime: frontmatter.readingTime,
      details: workDetailsSchema.parse({}),
    };
  } catch (error) {
    if (error instanceof Error && "code" in error && (error as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
}

export async function getAllWorkSummaries(): Promise<WorkSummary[]> {
  const slugs = await getWorkSlugs();
  const summaries = await Promise.all(
    slugs.map(async (slug) => {
      const summary = await getWorkSummary(slug);
      if (!summary) {
        throw new Error(`Missing work summary for slug: ${slug}`);
      }
      return summary;
    }),
  );
  return summaries;
}

export async function getWorkMdx(
  slug: string,
): Promise<{ slug: string; frontmatter: WorkFrontmatter; content: ReactElement }> {
  // Try exact match first
  let filePath = path.join(worksDirectory, `${slug}.mdx`);
  
  // If exact match doesn't exist, try to find a matching file with normalized name
  if (!existsSync(filePath)) {
    const normalizedSlug = slug
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const files = await readdir(worksDirectory);
    const matchingFile = files.find(file => {
      const fileName = path.basename(file, '.mdx');
      const normalizedFileName = fileName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return normalizedFileName === normalizedSlug;
    });
    
    if (matchingFile) {
      filePath = path.join(worksDirectory, matchingFile);
    }
  }
  
  const source = await readFile(filePath, 'utf8');

  const { frontmatter, content } = await compileMDX<WorkFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["anchor"],
              },
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });

  return {
    slug,
    frontmatter: workFrontmatterSchema.parse(frontmatter),
    content,
  };
}

export async function getPageMdx(
  slug: string,
): Promise<{ frontmatter: PageFrontmatter; content: ReactElement }> {
  const filePath = path.join(pagesDirectory, `${slug}.mdx`);
  const source = await readFile(filePath, "utf8");
  const { frontmatter, content } = await compileMDX<PageFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["anchor"],
              },
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });

  return {
    frontmatter: pageFrontmatterSchema.parse(frontmatter),
    content,
  };
}
