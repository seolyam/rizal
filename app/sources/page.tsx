import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { TourControlsBoundary } from "@/components/tour/tour-controls-boundary";
import { getCitations } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Citations & Further Reading",
  description:
    "Primary and secondary sources used throughout the Rizal interactive experience.",
};

export default async function SourcesPage() {
  const citations = await getCitations();
  return (
    <div className="container space-y-12 py-16">
      <TourControlsBoundary className="mx-auto max-w-3xl" />
      <SectionHeading
        title="References across the experience"
        description="Each interactive module cites reputable archives and scholarship. Expand or export this list for classroom bibliographies."
      />
      <ul className="space-y-4">
        {citations.map((citation) => (
          <li
            key={`${citation.title}-${citation.url ?? "nourl"}`}
            className="rounded-3xl border border-border/60 bg-card/60 p-4 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="font-medium text-foreground">{citation.title}</span>
            {citation.author ? <span>, {citation.author}</span> : null}
            <span className="ml-2 uppercase tracking-[0.3em] text-xs text-secondary">
              {citation.context}
            </span>
            {citation.url ? (
              <a
                href={citation.url}
                className="ml-3 text-secondary underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View source
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
