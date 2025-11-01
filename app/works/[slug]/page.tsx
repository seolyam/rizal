import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { getWorkBySlug } from "@/lib/data";
import { getWorkMdx, getWorkSlugs } from "@/lib/mdx";

interface WorkPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const summary = getWorkBySlug(params.slug);
  if (!summary) {
    return {
      title: "Work not found",
    };
  }
  return {
    title: `${summary.title} - Works Explorer`,
    description: summary.excerpt,
  };
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const summary = getWorkBySlug(params.slug);
  if (!summary) {
    notFound();
  }

  const { frontmatter, content } = await getWorkMdx(params.slug);

  return (
    <article className="container space-y-12 py-16">
      <SectionHeading
        eyebrow={`${frontmatter.type} - ${frontmatter.year}`}
        title={frontmatter.title}
        description={frontmatter.summary ?? summary.excerpt}
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)]">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground [&_h2]:font-serif [&_h2]:text-foreground [&_h2]:text-3xl [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:text-foreground">
          {content}
        </div>
        <aside className="space-y-6">
          {frontmatter.sources.length ? (
            <Card className="space-y-3 border-border/60 bg-card/80 p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Sources
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {frontmatter.sources.map((source) => (
                  <li key={source.title}>
                    <span className="font-medium text-foreground">{source.title}</span>
                    {source.author ? <span>, {source.author}</span> : null}
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-secondary underline-offset-4 hover:underline"
                      >
                        Read source
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
          <Card className="space-y-3 border-border/60 bg-card/80 p-6">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Quick Facts
            </h3>
            <dl className="space-y-3 text-sm text-muted-foreground">
              <div>
                <dt className="uppercase tracking-[0.3em] text-xs">Published</dt>
                <dd className="text-foreground">{frontmatter.year}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.3em] text-xs">Type</dt>
                <dd className="text-foreground">{frontmatter.type}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.3em] text-xs">Tags</dt>
                <dd className="text-foreground">{summary.tags.join(", ")}</dd>
              </div>
            </dl>
          </Card>
        </aside>
      </div>
    </article>
  );
}
