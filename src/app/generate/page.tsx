"use client";

import { GenerateStepsProvider } from "@/context/GenerateStepsContext";
import { StreamableStateProvider } from "@/context/StreamableStateContext";

import GenerateForm from "./_components/GenerateForm";
import ProgressTracker from "./_components/ProgressTracker";
import PromptSelector from "./_components/PromptSelector";
import StepContainer from "./_components/StepContainer";
import VideoVisualiser from "./_components/VideoVisualiser";
import { SelectedPromptsProvider } from "@/context/SelectedPromptsContext";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const StepComponents = [GenerateForm, PromptSelector, VideoVisualiser];

const Steps = () => {
  return (
    <>
      {StepComponents.map((Component, idx) => (
        <StepContainer key={idx} relatedStep={idx}>
          <Component />
        </StepContainer>
      ))}
    </>
  );
};

export default function Generate() {
  return (
    <GenerateStepsProvider>
      <StreamableStateProvider>
        <SelectedPromptsProvider>
          <div className="relative flex h-full justify-center items-center overflow-hidden pl-[88px] sm:pl-0 rounded-lg border border-secondary-50 border-opacity-70">
            <Steps />
            <ProgressTracker />
          </div>
        </SelectedPromptsProvider>
      </StreamableStateProvider>
    </GenerateStepsProvider>
  );
}
