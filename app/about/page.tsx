import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { getPageMdx } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "About the Project",
  description:
    "How the dYZ Rizal tribute was researched, designed, and developed for students and educators.",
};

export default async function AboutPage() {
  const { frontmatter, content } = await getPageMdx("about");
  return (
    <div className="container space-y-12 py-16">
      <SectionHeading
        eyebrow="About"
        title={frontmatter.title}
        description={frontmatter.lead}
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground [&_h2]:font-serif [&_h2]:text-foreground [&_h2]:text-3xl [&_h3]:font-serif [&_h3]:text-foreground">
          {content}
        </div>
        <aside className="space-y-6">
          {frontmatter.updated ? (
            <Card className="space-y-2 border-border/60 bg-card/80 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Updated
              </p>
              <p className="font-serif text-lg text-foreground">
                {new Date(frontmatter.updated).toLocaleDateString("en-PH", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </Card>
          ) : null}
          {frontmatter.sources.length ? (
            <Card className="space-y-3 border-border/60 bg-card/80 p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Reference Links
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed text-secondary">
                {frontmatter.sources.map((source) => (
                  <li key={source.title}>
                    {source.url ? (
                      <a href={source.url} className="hover:underline" target="_blank" rel="noopener noreferrer">
                        {source.title}
                      </a>
                    ) : (
                      <span>{source.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
