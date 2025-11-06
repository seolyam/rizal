"use client";

import { create } from "zustand";

type PreferencesState = {
  prefersReducedMotion: boolean;
};

export const usePreferencesStore = create<PreferencesState>(() => ({
  prefersReducedMotion: false,
}));
