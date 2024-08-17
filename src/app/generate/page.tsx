"use client";

import {
  GenerateStepsProvider,
  useGenerateStepsContext,
} from "@/context/GenerateStepsContext";
import { useStreamableState } from "@/utils/hooks/useStreamableState";
import type { AIAnswer } from "types";

import ProgressTracker from "./_components/ProgressTracker";
import PromptSelector from "./_components/PromptSelector";
import GenerateForm from "./_components/GenerateForm";
import StepContainer from "./_components/StepContainer";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const Steps = () => {
  const { currentStep } = useGenerateStepsContext();
  const [state, updateState] = useStreamableState<AIAnswer>({
    quotes: [],
  });

  return (
    <>
      <StepContainer relatedStep={0}>
        <GenerateForm updateState={updateState} />
      </StepContainer>
      <StepContainer relatedStep={1}>
        <PromptSelector prompts={state} />
      </StepContainer>
      {currentStep === 2 && <div> Final step </div>}
    </>
  );
};

export default function Generate() {
  return (
    <GenerateStepsProvider>
      <div className="relative flex h-full justify-center items-center overflow-hidden pl-[88px] sm:pl-0 rounded-lg border border-secondary-50 border-opacity-70">
        <Steps />
        <ProgressTracker />
      </div>
    </GenerateStepsProvider>
  );
}
