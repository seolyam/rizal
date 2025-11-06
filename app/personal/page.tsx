import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { TourControls } from "@/components/tour/tour-controls";

export const metadata: Metadata = {
  title: "Personal Profile",
  description:
    "Key biographical details, family background, education, and personal facets of José Rizal drawn from historical sources.",
};

const familyDetails = [
  { label: "Full name", value: "José Protasio Rizal Mercado y Alonso Realonda" },
  { label: "Nickname", value: "Pepe" },
  { label: "Birth", value: "June 19, 1861 · Calamba, Laguna, Philippines" },
  {
    label: "Parents",
    value: "Francisco Mercado (landowner) & Teodora Alonso Realonda (educator)",
  },
  {
    label: "Siblings",
    value:
      "Saturnina, Paciano, Narcisa, Olimpia, Lucia, María, Concepción, Josefa, Trinidad, Soledad",
  },
  { label: "Heritage", value: "Chinese, Spanish, and Filipino ancestry" },
];

const educationDetails = [
  "Home instruction with his mother, then private tutoring in Biñan, Laguna.",
  "Ateneo Municipal de Manila (BA, 1877) – graduated sobresaliente; active in arts and student societies.",
  "Universidad de Santo Tomas (Medicine & Philosophy) – left after experiencing discrimination.",
  "Universidad Central de Madrid – Licentiate in Medicine (1884) and Philosophy & Letters (1885).",
  "Advanced ophthalmology training in Paris and Heidelberg under Dr. Otto Becker; later served Dapitan patients.",
];

const achievements = [
  "Author of Noli Me Tángere (1887) and El Filibusterismo (1891), critical to the Propaganda Movement.",
  "Contributor to La Solidaridad and writer of seminal essays such as “La Indolencia de los Filipinos.”",
  "Practicing ophthalmologist who offered surgeries to indigent patients and his mother.",
  "Scientist, ethnographer, and naturalist who documented Philippine flora and fauna.",
  "Educator and civic leader in Dapitan—built a school, water system, and agricultural cooperative.",
];

const personalNotes = [
  "Polyglot fluent in more than 20 languages; avid reader, artist, and diarist.",
  "Skilled in fencing, marksmanship, and engineering; designed a waterworks system in Dapitan.",
  "Maintained close relationships with Segunda Katigbak, Leonor Rivera, Nelly Boustead, and Josephine Bracken, among others.",
  "Advocated humanist, secular, and rationalist ideals; believed education and civil liberties would uplift Filipinos.",
  "Executed on December 30, 1896, at Bagumbayan. His farewell poem “Mi Último Adiós” remains a national touchstone.",
];

export default function PersonalPage() {
  return (
    <div className="container space-y-12 py-16">
      <TourControls className="mx-auto max-w-3xl" />
      <SectionHeading
        title="José Rizal · Personal Profile"
        description="A concise reference to Rizal’s background, education, relationships, and personal convictions based on primary summaries in informations.md."
      />

      <Card className="grid gap-6 border-border/60 bg-card/85 p-8 shadow-sm md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-semibold text-foreground">Family & Origins</h3>
          <dl className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            {familyDetails.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
                  {item.label}
                </dt>
                <dd className="mt-1 text-foreground/85">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-semibold text-foreground">Education & Training</h3>
          <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            {educationDetails.map((detail, index) => (
              <li key={index} className="flex gap-3">
                <span className="font-mono text-xs font-semibold text-secondary">{index + 1}.</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card className="space-y-6 border-border/60 bg-card/85 p-8 shadow-sm">
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-semibold text-foreground">Achievements</h3>
          <p className="text-sm text-muted-foreground">
            Reformist work spanned literature, science, medicine, and education—all executed with an
            eye toward national dignity.
          </p>
        </div>
        <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex gap-3">
              <span className="font-mono text-xs font-semibold text-secondary">{index + 1}.</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="space-y-6 border-border/60 bg-card/85 p-8 shadow-sm">
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-semibold text-foreground">Personal Notes</h3>
          <p className="text-sm text-muted-foreground">
            Glimpses into Rizal’s personality, relationships, skills, and beliefs drawn directly from
            the compiled informations.md brief.
          </p>
        </div>
        <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          {personalNotes.map((note, index) => (
            <li key={index} className="flex gap-3">
              <span className="font-mono text-xs font-semibold text-secondary">{index + 1}.</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
