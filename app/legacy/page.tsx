import type { Metadata } from "next";
import { MotionSection } from "@/components/sections/motion-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { QuoteCard } from "@/components/quotes/quote-card";
import { getQuotes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Legacy of Jose Rizal",
  description:
    "Explore how Jose Rizal's ideas shaped education, civic life, and commemorations long after 1896.",
};

const legacyMilestones = [
  {
    year: 1901,
    title: "Province of Rizal Created",
    detail:
      "The American colonial government names a province after Rizal, signaling his ascent as a symbol of Filipino nationhood.",
  },
  {
    year: 1913,
    title: "Rizal Monument Unveiled",
    detail:
      "The bronze-and-granite monument at Luneta Park is inaugurated, becoming a pilgrimage site for civic ceremonies and student field trips.",
  },
  {
    year: 1956,
    title: "Republic Act No. 1425 (Rizal Law)",
    detail:
      "Senator Claro M. Recto champions a law mandating the study of Rizal's novels in all schools to cultivate historical awareness.",
  },
  {
    year: 1996,
    title: "Centennial Commemorations",
    detail:
      "On the centenary of his martyrdom, museums, documentaries, and new translations reintroduce Rizal to a global audience.",
  },
  {
    year: 2021,
    title: "Rizal and Digital Humanities",
    detail:
      "Scholars digitise manuscripts, letters, and annotated maps, enabling classrooms to interact with Rizal's archives online.",
  },
];

const civicLegacies = [
  {
    heading: "Education Mandates",
    body:
      "Rizal's writings anchor humanities curricula. Universities pair his novels with local history projects, while teachers design debate modules around the reform versus revolution question.",
  },
  {
    heading: "Public Memory",
    body:
      "Every Philippine town features a Rizal Plaza or marker. Heritage workers restore shrines in Calamba, Dapitan, and Intramuros to host immersive exhibits for the youth.",
  },
  {
    heading: "Regional Inspiration",
    body:
      "Across Southeast Asia, reformers cite Rizal's peaceful advocacy when discussing anti-colonial movements and transnational solidarity.",
  },
];

const classroomIdeas = [
  {
    label: "Museum Walk",
    text:
      "Set up stations featuring scanned letters, sketches, and diary entries. Students interpret each artifact and connect it to major reforms.",
  },
  {
    label: "Policy Brief",
    text:
      "Challenge learners to write a short policy memo imagining how Rizal might address present-day issues such as disinformation or regional inequality.",
  },
  {
    label: "Global Map Overlay",
    text:
      "Pair the Travels map with trade data or literacy rates from the 1880s to see how Rizal compared colonial policies with other empires.",
  },
];

export default function LegacyPage() {
  const filteredQuotes = getQuotes().filter(
    (quote) => typeof quote.year === "number" && quote.year >= 1889,
  );
  const quotes = filteredQuotes.length ? filteredQuotes : getQuotes();

  return (
    <div className="space-y-24 pb-24">
      <MotionSection className="container space-y-8">
        <SectionHeading
          eyebrow="Living Memory"
          title="Why Rizal still matters"
          description="Beyond novels and monuments, Rizal's legacy shapes education policy, civic spaces, and the language of rights across the Philippines and the diaspora."
        />
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Each generation revisits Rizal to ask how ethical leadership, intercultural exchange, and
          scientific inquiry can serve the common good. This page gathers classroom-ready context on
          how his influence evolved after 1896 and why the Rizal Law still frames historical
          education today.
        </p>
      </MotionSection>

      <MotionSection className="container space-y-10">
        <SectionHeading
          eyebrow="National Milestones"
          title="A century of remembrance"
          description="Key dates that kept Rizal at the heart of civic rituals and public discourse."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {legacyMilestones.map((milestone) => (
            <div
              key={milestone.year}
              className="paper-surface ink-outline relative overflow-hidden rounded-[30px] border border-border/60 p-6 shadow-soft"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-secondary">
                {milestone.year}
              </span>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">
                {milestone.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {milestone.detail}
              </p>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="container space-y-10">
        <SectionHeading
          eyebrow="Continuing Legacies"
          title="Where we meet Rizal today"
          description="From plazas to policy debates, Rizal's ideas animate how communities imagine nationhood."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {civicLegacies.map((item) => (
            <article
              key={item.heading}
              className="paper-surface ink-outline flex flex-col justify-between rounded-[28px] border border-border/60 p-6 shadow-sm"
            >
              <h3 className="font-serif text-xl font-semibold text-foreground">{item.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="container space-y-10">
        <SectionHeading
          eyebrow="Classroom Prompts"
          title="Learning activities inspired by Rizal Law"
          description="Blend humanities, social science, and civic skills with these adaptable ideas."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {classroomIdeas.map((idea) => (
            <div
              key={idea.label}
              className="rounded-[26px] border border-border/50 bg-card/90 p-5 shadow-sm"
            >
              <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                {idea.label}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{idea.text}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="container space-y-10">
        <SectionHeading
          eyebrow="Quotable Rizal"
          title="Lines that shaped civic imagination"
          description="Use these quotes as writing prompts, debate starters, or social media explainers for Rizal Month."
        />
        <QuoteCard quotes={quotes} />
      </MotionSection>
    </div>
  );
}
