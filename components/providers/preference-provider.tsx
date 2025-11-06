"use client";

import { useEffect } from "react";
import { usePreferencesStore } from "@/stores/preferences-store";

export function PreferenceProvider({ children }: { children: React.ReactNode }) {
  const { prefersReducedMotion } = usePreferencesStore();

  useEffect(() => {
    if (prefersReducedMotion) {
      document.body.dataset.motion = "reduce";
    } else {
      delete document.body.dataset.motion;
    }
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
