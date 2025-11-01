"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type AnswerRecord = {
  questionId: string;
  selectedOption: string;
  correct: boolean;
};

type QuizState = {
  current: number;
  answers: Record<string, AnswerRecord>;
  started: boolean;
  completed: boolean;
  start: () => void;
  answer: (record: AnswerRecord, total: number) => void;
  goTo: (index: number) => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      current: 0,
      answers: {},
      started: false,
      completed: false,
      start: () => set({ current: 0, answers: {}, started: true, completed: false }),
      answer: (record, total) =>
        set((state) => {
          const answers = { ...state.answers, [record.questionId]: record };
          const answeredCount = Object.keys(answers).length;
          const nextIndex = Math.min(state.current + 1, total - 1);
          return {
            answers,
            current: nextIndex,
            started: true,
            completed: answeredCount >= total,
          };
        }),
      goTo: (index) => set({ current: index, started: true }),
      reset: () => set({ current: 0, answers: {}, started: false, completed: false }),
    }),
    {
      name: "rizal-quiz-progress",
    },
  ),
);
