import { ParallaxHero } from "@/components/sections/parallax-hero";
import { MotionSection } from "@/components/sections/motion-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Timeline } from "@/components/timeline/timeline";
import { WorkCard } from "@/components/works/work-card";
import { QuoteCard } from "@/components/quotes/quote-card";
import { TravelMap } from "@/components/travels/travel-map";
import { Button } from "@/components/ui/button";
import { getTimeline, getWorks, getQuotes, getTravels } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  const timeline = getTimeline().slice(0, 6);
  const works = getWorks().slice(0, 3);
  const quotes = getQuotes();
  const travels = getTravels().slice(0, 5);

  return (
    <div className="space-y-24 pb-24">
      <ParallaxHero
        eyebrow="Interactive Tribute"
        title={"Jos\u00e9 Rizal"}
        highlightedText="Lifeways in Motion"
        description="Explore the life, travels, and legacy of the Philippine national hero through animated timelines, annotated works, and classroom-ready resources."
        primaryCta={{ href: "/timeline", label: "View the Timeline" }}
        secondaryCta={{ href: "/works", label: "Study the Works" }}
        image={{
          src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Jose_Rizal_full.jpg",
          alt: "Portrait of Jos\u00e9 Rizal",
          width: 640,
          height: 800,
        }}
      />

      <MotionSection className="container space-y-12">
        <SectionHeading
          eyebrow="Life Story"
          title="A timeline mapped for classrooms"
          description="Scroll through major milestones from Calamba to Dapitan and see how reforms, travels, and writings intersect."
        />
        <Timeline events={timeline} />
        <div className="flex justify-end">
          <Button asChild variant="link">
            <Link href="/timeline">
              Explore full timeline <span aria-hidden>&rarr;</span>
            </Link>
          </Button>
        </div>
      </MotionSection>

      <MotionSection className="container space-y-12">
        <SectionHeading
          eyebrow="Works"
          title="Annotated library of novels, essays, and letters"
          description="Dive into MDX-enhanced readings with source citations, classroom prompts, and quick filters."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {works.map((work, index) => (
            <WorkCard key={work.slug} work={work} index={index} />
          ))}
        </div>
        <div className="flex justify-end">
          <Button asChild variant="link">
            <Link href="/works">
              Browse all works <span aria-hidden>&rarr;</span>
            </Link>
          </Button>
        </div>
      </MotionSection>

      <MotionSection className="container space-y-12">
        <SectionHeading
          eyebrow="Travels"
          title="Tracing a global journey"
          description="From Manila's classrooms to European salons, Rizal connected ideas across continents."
        />
        <TravelMap spots={travels} />
        <div className="flex justify-end">
          <Button asChild variant="link">
            <Link href="/travels">
              Open travel map <span aria-hidden>&rarr;</span>
            </Link>
          </Button>
        </div>
      </MotionSection>

      <MotionSection className="container space-y-12">
        <SectionHeading
          eyebrow="Voices"
          title="Quotes to spark discussion"
          description="Shuffle through Rizal's letters, speeches, and poems for classroom journaling or social reflections."
        />
        <QuoteCard quotes={quotes} />
      </MotionSection>
    </div>
  );
}

