"use client";

import { useState } from "react";
import TrackerUnit from "./components/TrackerUnit";

export type TrackerState = "default" | "active" | "completed";

export default function ProgressTracker() {
  const states: TrackerState[] = ["default", "active", "completed"];
  const steps = ["Start", "End", "Review", "Finish"];
  const [currentState, setCurrentState] = useState<TrackerState | undefined>(
    states[0],
  );

  const moveStepForward = () => {
    if (!currentState) return;

    const currentIndex = states.indexOf(currentState);
    if (currentIndex < states.length - 1) {
      setCurrentState(states[currentIndex + 1]);
    }
  };

  return (
    <div
      onClick={moveStepForward}
      className="absolute blurred_background-2xl flex gap-2 px-8 py-4 bottom-6 left-[50%] -translate-x-1/2 rounded-full"
    >
      {steps.map((label, index) => (
        <TrackerUnit
          key={label}
          index={index + 1}
          label={label}
          state={currentState}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
}
