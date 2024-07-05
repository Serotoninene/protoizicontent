"use client";

import { useState } from "react";
import TrackerUnit from "./components/TrackerUnit";

export type TrackerStates = "default" | "active" | "completed";

export default function ProgressTracker() {
  const states: TrackerStates[] = ["default", "active", "completed"];
  const [currentState, setCurrentState] = useState<TrackerStates | undefined>(
    states[1],
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
      className="absolute blurred_background-2xl flex px-8 py-4 bottom-6 left-[50%] -translate-x-1/2 rounded-full"
    >
      <TrackerUnit index={1} label="Start" state={currentState} />
    </div>
  );
}
