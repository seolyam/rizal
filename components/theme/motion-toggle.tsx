"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreferencesStore } from "@/stores/preferences-store";

export function MotionToggle() {
  const { prefersReducedMotion, setReducedMotion } = usePreferencesStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setReducedMotion(!prefersReducedMotion)}
      aria-label="Toggle animations"
      className={prefersReducedMotion ? "bg-accent/70" : ""}
    >
      <Sparkles className="mr-2 h-4 w-4" aria-hidden />
      {prefersReducedMotion ? "Motion Off" : "Motion On"}
    </Button>
  );
}
