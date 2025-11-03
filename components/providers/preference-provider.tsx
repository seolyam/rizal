"use client";

import { useEffect } from "react";
import { usePreferencesStore } from "@/stores/preferences-store";

export function PreferenceProvider({ children }: { children: React.ReactNode }) {
  const { sepiaMode, prefersReducedMotion } = usePreferencesStore();

  useEffect(() => {
    if (sepiaMode) {
      document.body.dataset.theme = "sepia";
    } else {
      delete document.body.dataset.theme;
    }
    if (prefersReducedMotion) {
      document.body.dataset.motion = "reduce";
    } else {
      delete document.body.dataset.motion;
    }
  }, [sepiaMode, prefersReducedMotion]);

  return <>{children}</>;
}
