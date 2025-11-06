import type { Route } from "next";

export type TourStep = {
  label: string;
  href: Route;
  description: string;
};

export const tourSteps: TourStep[] = [
  {
    label: "Personal Profile",
    href: "/personal",
    description:
      "Discover Rizal’s family roots, multilingual education, and the values that fueled his reformist mission.",
  },
  {
    label: "Timeline",
    href: "/timeline",
    description:
      "Follow a chronological journey from Calamba to Bagumbayan with tags, citations, and classroom-ready highlights.",
  },
  {
    label: "Travels",
    href: "/travels",
    description:
      "See how Rizal’s voyages across Europe and Asia shaped his ideas through an interactive atlas of encounters.",
  },
  {
    label: "Works",
    href: "/works",
    description:
      "Dive into annotated novels, essays, and letters enriched with themes, summaries, and teaching prompts.",
  },
  {
    label: "Ideas",
    href: "/ideas",
    description:
      "Browse the glossary of Rizal’s key concepts—from civic virtue to scientific nationalism—and link to related texts.",
  },
  {
    label: "Quiz",
    href: "/quiz",
    description:
      "Challenge yourself with adaptive questions that reveal explanations and references after every answer.",
  },
  {
    label: "Gallery",
    href: "/gallery",
    description:
      "Preview curated artifacts, manuscripts, and commemorations suitable for classroom slides and exhibits.",
  },
  {
    label: "Legacy",
    href: "/legacy",
    description:
      "Understand how Rizal’s influence lived on through national milestones, civic programs, and classroom activities.",
  },
  {
    label: "Sources",
    href: "/sources",
    description:
      "Review the archives, books, and digital resources cited across this research-backed experience.",
  },
];

export function getTourStepIndex(pathname: string): number {
  return tourSteps.findIndex((step) => step.href === pathname);
}
