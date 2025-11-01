import path from "node:path";
import { readFile, readdir } from "node:fs/promises";
import type { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";
import {
  workFrontmatterSchema,
  pageFrontmatterSchema,
  type WorkFrontmatter,
  type PageFrontmatter,
} from "@/lib/schemas";

const worksDirectory = path.join(process.cwd(), "content", "works");
const pagesDirectory = path.join(process.cwd(), "content", "pages");

export async function getWorkSlugs(): Promise<string[]> {
  const entries = await readdir(worksDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

export async function getWorkMdx(
  slug: string,
): Promise<{ slug: string; frontmatter: WorkFrontmatter; content: ReactElement }> {
  const filePath = path.join(worksDirectory, `${slug}.mdx`);
  const source = await readFile(filePath, "utf8");

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
