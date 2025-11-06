import type { Metadata } from "next";
import { Timeline } from "@/components/timeline/timeline";
import { SectionHeading } from "@/components/sections/section-heading";
import { getTimeline } from "@/lib/data";
import { TourControls } from "@/components/tour/tour-controls";

export const metadata: Metadata = {
  title: "Interactive Timeline",
  description:
    "Scroll-driven chapters tracing Jos\u00e9 Rizal's life from Calamba to his martyrdom, complete with tags and citations.",
};

export default function TimelinePage() {
  const timeline = getTimeline();
  return (
    <div className="container space-y-12 py-16">
      <TourControls className="mx-auto max-w-3xl" />
      <SectionHeading
        title="Rizal's journey across continents and causes"
        description="Use the sticky year index to quickly navigate, and filter key moments by thematic tags in the works explorer."
      />
      <Timeline events={timeline} />
    </div>
  );
}
