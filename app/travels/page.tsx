import type { Metadata } from "next";
import { TravelMap } from "@/components/travels/travel-map";
import { SectionHeading } from "@/components/sections/section-heading";
import { TourControlsBoundary } from "@/components/tour/tour-controls-boundary";
import { getTravels } from "@/lib/data";

export const metadata: Metadata = {
  title: "Travels & Itineraries",
  description:
    "Interactive map of José Rizal's journeys with contextual notes for classrooms and heritage explorations.",
};

export default function TravelsPage() {
  const travels = getTravels();
  return (
    <div className="container space-y-12 py-16 text-center">
      <TourControlsBoundary className="mx-auto max-w-3xl text-left" />
      <SectionHeading
        title="Mapping Rizal's global networks"
        description="Hover or focus on each pin to uncover stories, dates, and teaching notes from Calamba to Europe and back."
      />
      <TravelMap spots={travels} />
    </div>
  );
}
