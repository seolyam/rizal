"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getTourStepIndex, tourSteps } from "@/lib/tour";
import { cn } from "@/lib/utils";

type TourControlsProps = {
  className?: string;
};

export function TourControls({ className }: TourControlsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inTour = searchParams.get("tour") === "1";

  const { index, progress, prevHref, nextHref, nextLabel } = useMemo(() => {
    const currentIndex = getTourStepIndex(pathname);
    const total = tourSteps.length;
    if (currentIndex === -1) {
      return {
        index: -1,
        progress: 0,
        prevHref: null as string | null,
        nextHref: null as string | null,
        nextLabel: "Next",
      };
    }
    const prev =
      currentIndex > 0 ? `${tourSteps[currentIndex - 1].href}?tour=1` : null;
    const next =
      currentIndex < total - 1
        ? `${tourSteps[currentIndex + 1].href}?tour=1`
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
      router.push(prevHref);
    }
  };

  const handleNext = () => {
    if (nextHref) {
      router.push(nextHref);
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
