import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { SectionHeading } from "@/components/sections/section-heading";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery & Artifacts",
  description:
    "Curated imagery and artifacts from José Rizal's life, including manuscripts, monuments, and heritage homes.",
};

export default function GalleryPage() {
  const items = getGallery();
  return (
    <div className="container space-y-12 py-16">
      <SectionHeading
        eyebrow="Gallery"
        title="Visual archives and commemorations"
        description="Each asset links to museums or archives credited below. Perfect for classroom slide decks and visual primary sources."
      />
      <GalleryGrid items={items} />
    </div>
  );
}
