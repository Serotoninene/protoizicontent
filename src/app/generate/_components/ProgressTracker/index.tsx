"use client";

import { useState } from "react";
import TrackerUnit from "./components/TrackerUnit";

export type TrackerState = "default" | "active" | "completed";

export default function ProgressTracker() {
  const steps = ["Start", "Theme", "Select", "Done"];
  const [currentStep, setCurrentStep] = useState(0);

  const moveStepForward = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  return (
    <div
      onClick={moveStepForward}
      className="absolute blurred_background-2xl flex gap-2 px-8 py-4 bottom-6 left-[50%] -translate-x-1/2 rounded-full"
    >
      {steps.map((label, index) => {
        let state: TrackerState = "default";
        if (index < currentStep) {
          state = "completed";
        } else if (index === currentStep) {
          state = "active";
        }

        return (
          <TrackerUnit
            key={label}
            index={index + 1}
            label={label}
            state={state}
            isLast={index === steps.length - 1}
          />
        );
      })}
    </div>
  );
}
