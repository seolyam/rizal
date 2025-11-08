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
          heroImage={{
            src: "/images/jose-rizal.jpg",
            alt: "Studio portrait of José Rizal wearing an overcoat",
            caption: "José Rizal, c. 1896",
            credit: "Public Domain",
          }}
        />
      </div>
    </div>
  );
}
