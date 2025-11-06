import { ParallaxHero } from "@/components/sections/parallax-hero";

import { tourSteps } from "@/lib/tour";

export default async function Home() {
  return (
    <div className="space-y-24 pb-24 pt-24">
      <div className="container">
        <ParallaxHero
          title={"Jos\u00e9 Rizal"}
          highlightedText="Lifeways in Motion"
          description="Explore the life, travels, and legacy of the Philippine national hero through animated timelines, annotated works, and classroom-ready resources."
          tourSteps={tourSteps}
          image={{
            src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Jose_Rizal_full.jpg",
            alt: "Portrait of Jos\u00e9 Rizal",
            width: 640,
            height: 800,
          }}
        />
      </div>
    </div>
  );
}
