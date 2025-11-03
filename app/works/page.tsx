import type { Metadata } from "next";
import { WorksExplorer } from "@/components/works/works-explorer";
import { SectionHeading } from "@/components/sections/section-heading";
import { getWorks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Works Explorer",
  description:
    "Filter José Rizal's novels, essays, and annotations with quick summaries, tags, and classroom prompts.",
};

export default function WorksPage() {
  const works = getWorks();
  return (
    <div className="container space-y-12 py-16">
      <SectionHeading
        eyebrow="Works"
        title="Annotated readings and primary sources"
        description="Use the filters to segment novels, essays, and commentaries. Each entry links to MDX-rich detail pages with citations."
      />
      <WorksExplorer works={works} />
    </div>
  );
}
