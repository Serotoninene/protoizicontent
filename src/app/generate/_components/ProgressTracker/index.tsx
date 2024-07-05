"use client";

import TrackerUnit from "./components/TrackerUnit";

export default function ProgressTracker() {
  return (
    <div className="absolute blurred_background-2xl flex px-8 py-4 bottom-6 left-[50%] -translate-x-1/2 rounded-full">
      <TrackerUnit index={1} label="Start" state="active" />
    </div>
  );
}
