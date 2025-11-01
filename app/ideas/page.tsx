import type { Metadata } from "next";
import { IdeasGrid } from "@/components/ideas/ideas-grid";
import { SectionHeading } from "@/components/sections/section-heading";
import { getIdeas, getWorks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Themes & Philosophy",
  description:
    "Glossary of key themes, reforms, and concepts animating José Rizal's writings with links to related works.",
};

export default function IdeasPage() {
  const ideas = getIdeas();
  const works = getWorks();
  return (
    <div className="container space-y-12 py-16">
      <SectionHeading
        eyebrow="Ideas"
        title="Key themes in Rizal's thought"
        description="Use these glossary notes to scaffold lessons on nationalism, civic virtue, and education reforms. Each concept links to annotated works for deeper study."
      />
      <IdeasGrid ideas={ideas} works={works} />
    </div>
  );
}
