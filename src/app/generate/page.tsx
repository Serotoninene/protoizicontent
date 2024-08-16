"use client";

import {
  GenerateStepsProvider,
  useGenerateStepsContext,
} from "@/context/GenerateStepsContext";
import { useStreamableState } from "@/utils/hooks/useStreamableState";
import { AIAnswer } from "types";

import ProgressTracker from "./_components/ProgressTracker";
import PromptSelector from "./_components/PromptSelector";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Generate() {
  const { currentStep, steps } = useGenerateStepsContext();
  const [state, updateState] = useStreamableState<AIAnswer>({ quotes: [] });

  return (
    <GenerateStepsProvider>
      <div className="relative flex h-full justify-center items-center rounded-lg border border-secondary-50 border-opacity-70">
        {/* <GenerateForm updateState={updateState} /> */}
        <PromptSelector prompts={state} />
        <ProgressTracker />
      </div>
    </GenerateStepsProvider>
  );
}
