import type { Metadata } from "next";
import { QuizInteractive } from "@/components/quiz/quiz-interactive";
import { SectionHeading } from "@/components/sections/section-heading";
import { TourControlsBoundary } from "@/components/tour/tour-controls-boundary";
import { getQuizQuestions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Knowledge Check",
  description:
    "Self-paced quiz covering José Rizal's biography, travels, and writings with instant feedback and references.",
};

export default function QuizPage() {
  const questions = getQuizQuestions();
  return (
    <div className="container space-y-12 py-16">
      <TourControlsBoundary className="mx-auto max-w-3xl" />
      <SectionHeading
        title="Assess your understanding"
        description="Shuffle through questions aligned with the timeline and works explorer. Explanations and citations appear after each answer."
      />
      <QuizInteractive questions={questions} />
    </div>
  );
}
