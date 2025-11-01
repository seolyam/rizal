"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferencesState = {
  prefersReducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  sepiaMode: boolean;
  toggleSepia: () => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      prefersReducedMotion: false,
      setReducedMotion: (value) => set({ prefersReducedMotion: value }),
      sepiaMode: false,
      toggleSepia: () =>
        set((state) => ({
          sepiaMode: !state.sepiaMode,
        })),
    }),
    {
      name: "rizal-preferences",
    },
  ),
);
