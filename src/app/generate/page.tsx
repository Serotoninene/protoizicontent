"use client";

import {
  GenerateStepsProvider,
  useGenerateStepsContext,
} from "@/context/GenerateStepsContext";
import { useStreamableState } from "@/utils/hooks/useStreamableState";
import type { AIAnswer } from "types";

import ProgressTracker from "./_components/ProgressTracker";
import PromptSelector from "./_components/PromptSelector";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const testData = [
  {
    setup: "The universe is an infinite library,",
    inBetween: "each star a book,",
    conclusion: "each life a story yet to be fully read.",
  },
  {
    setup: "We are not merely observers of the universe,",
    inBetween: "we are its conscious participants,",
    conclusion: "engaging in the dialogue between existence and meaning.",
  },
  {
    setup: "In the vastness of space,",
    inBetween: "we find not loneliness,",
    conclusion: "but the shared solitude that connects all life.",
  },
];

export default function Generate() {
  const { currentStep, steps } = useGenerateStepsContext();
  const [state, updateState] = useStreamableState<AIAnswer>({
    quotes: testData,
  });

  return (
    <GenerateStepsProvider>
      <div className="relative flex h-full justify-center items-center pl-[88px] rounded-lg border border-secondary-50 border-opacity-70">
        {/* <GenerateForm updateState={updateState} /> */}
        <PromptSelector prompts={state} />
        <ProgressTracker />
      </div>
    </GenerateStepsProvider>
  );
}
