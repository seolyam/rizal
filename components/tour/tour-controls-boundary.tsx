import { Suspense } from "react";
import { TourControls, type TourControlsProps } from "@/components/tour/tour-controls";

export function TourControlsBoundary(props: TourControlsProps) {
  return (
    <Suspense fallback={null}>
      <TourControls {...props} />
    </Suspense>
  );
}
