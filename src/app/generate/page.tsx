"use client";

import {
  GenerateStepsProvider,
  useGenerateStepsContext,
} from "@/context/GenerateStepsContext";
import GenerateForm from "./_components/GenerateForm";
import ProgressTracker from "./_components/ProgressTracker";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Generate() {
  const { steps, currentStep } = useGenerateStepsContext();

  return (
    <GenerateStepsProvider>
      <div className="relative flex h-full justify-center items-center rounded-lg border border-secondary-50 border-opacity-70">
        <GenerateForm />
        <ProgressTracker />
      </div>
    </GenerateStepsProvider>
  );
}
