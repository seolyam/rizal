"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { QuizQuestion } from "@/lib/schemas";
import { useQuizStore } from "@/stores/quiz-store";
import { usePreferencesStore } from "@/stores/preferences-store";

type QuizInteractiveProps = {
  questions: QuizQuestion[];
};

export function QuizInteractive({ questions }: QuizInteractiveProps) {
  const total = questions.length;
  const { current, answers, started, start, goTo, answer, reset, completed } =
    useQuizStore();
  const { prefersReducedMotion } = usePreferencesStore();

  const currentQuestion = questions[current] ?? questions[0];
  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers],
  );
  const score = useMemo(
    () =>
      Object.values(answers).reduce(
        (sum, record) => (record.correct ? sum + 1 : sum),
        0,
      ),
    [answers],
  );

  const selected = currentQuestion
    ? answers[currentQuestion.id]?.selectedOption
    : undefined;
  const explanation = currentQuestion?.options.find(
    (option) => option.id === selected,
  )?.explanation;

  const handleSelect = (optionId: string) => {
    if (!currentQuestion) return;
    answer(
      {
        questionId: currentQuestion.id,
        selectedOption: optionId,
        correct: optionId === currentQuestion.answer,
      },
      total,
    );
  };

  return (
    <Card className="space-y-6 border-border/70 bg-card/80 p-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Knowledge Check
          </p>
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Quiz Yourself on Rizal
          </h2>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            Question {Math.min(current + 1, total)} of {total}
          </span>
          <span>·</span>
          <span>{score} correct</span>
        </div>
      </header>

      <ProgressBar progress={(answeredCount / total) * 100} />

      {!started ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border/60 bg-background/80 p-8 text-center">
          <p className="max-w-lg text-sm text-muted-foreground">
            Test your recall of Rizal&apos;s life, travels, and works. Each
            response reveals an explanation and source reference.
          </p>
          <Button onClick={() => start()}>Start Quiz</Button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.id}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-border/60 bg-background/70 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-secondary">
                {currentQuestion?.category}
              </p>
              <h3 className="mt-3 font-serif text-xl leading-snug text-foreground md:text-2xl">
                {currentQuestion?.question}
              </h3>
            </div>
            <div className="space-y-4">
              {currentQuestion?.options.map((option) => {
                const isSelected = selected === option.id;
                const isCorrect = option.id === currentQuestion.answer;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className="w-full text-left"
                  >
                    <div
                      className={
                        "flex flex-col gap-2 rounded-3xl border px-4 py-4 transition disabled:opacity-70" +
                        " " +
                        (isSelected
                          ? isCorrect
                            ? "border-secondary bg-secondary/20 text-foreground"
                            : "border-destructive/80 bg-destructive/10 text-destructive-foreground"
                          : "border-border/60 bg-background/80 hover:border-secondary/40 hover:bg-secondary/10")
                      }
                    >
                      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        {option.id.toUpperCase()}
                      </span>
                      <p className="text-base text-foreground">{option.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            {explanation ? (
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                className="rounded-3xl border border-secondary/40 bg-secondary/10 p-4 text-sm text-muted-foreground"
              >
                <p>{explanation}</p>
                {currentQuestion?.reference ? (
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-secondary">
                    Source: {currentQuestion.reference}
                  </p>
                ) : null}
              </motion.div>
            ) : null}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => goTo(Math.max(current - 1, 0))}
                disabled={current === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  goTo(Math.min(current + 1, total - 1))
                }
                disabled={current >= total - 1}
              >
                Next
              </Button>
              {completed ? (
                <Button variant="ghost" onClick={() => reset()}>
                  Retake Quiz ({score}/{total})
                </Button>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </Card>
  );
}
