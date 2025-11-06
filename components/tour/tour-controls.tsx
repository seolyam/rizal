"use client";

import { useMemo } from "react";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getTourStepIndex, tourSteps } from "@/lib/tour";
import { cn } from "@/lib/utils";

export type TourControlsProps = {
  className?: string;
};

export function TourControls({ className }: TourControlsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inTour = searchParams.get("tour") === "1";

  const { index, progress, prevHref, nextHref, nextLabel } = useMemo<{
    index: number;
    progress: number;
    prevHref: Route | null;
    nextHref: Route;
    nextLabel: string;
  }>(() => {
    const currentIndex = getTourStepIndex(pathname);
    const total = tourSteps.length;
    if (currentIndex === -1) {
      return {
        index: -1,
        progress: 0,
        prevHref: null,
        nextHref: "/" as Route,
        nextLabel: "Next",
      };
    }
    const prev: Route | null =
      currentIndex > 0
        ? tourSteps[currentIndex - 1].href
        : null;
    const next: Route =
      currentIndex < total - 1
        ? tourSteps[currentIndex + 1].href
        : "/";

    return {
      index: currentIndex,
      progress: ((currentIndex + 1) / total) * 100,
      prevHref: prev,
      nextHref: next,
      nextLabel: currentIndex === total - 1 ? "Finish tour" : "Next stop",
    };
  }, [pathname]);

  if (!inTour || index === -1) {
    return null;
  }

  const handlePrev = () => {
    if (prevHref) {
      const target = inTour ? (`${prevHref}?tour=1` as Route) : prevHref;
      router.push(target);
    }
  };

  const handleNext = () => {
    if (nextHref) {
      const target = inTour ? (`${nextHref}?tour=1` as Route) : nextHref;
      router.push(target);
    }
  };

  return (
    <div
      className={cn(
        "rounded-[28px] border border-border/60 bg-card/85 p-6 shadow-sm",
        className,
      )}
    >
      <ProgressBar
        progress={progress}
        label={`Tour progress ${index + 1} of ${tourSteps.length}`}
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-border/60"
          onClick={handlePrev}
          disabled={!prevHref}
        >
          ← Previous
        </Button>
        <Button type="button" onClick={handleNext}>
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}
