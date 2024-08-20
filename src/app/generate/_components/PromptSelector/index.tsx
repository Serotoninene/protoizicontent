import { useGenerateStepsContext } from "@/context/GenerateStepsContext";
import { useStreamableStateContext } from "@/context/StreamableStateContext";
import SecondaryButton from "@/ui/atoms/SecondaryButton";
import { SparklesIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import type { AIAnswer, Quote } from "types";

const PromptSelector = () => {
  const { state } = useStreamableStateContext();
  const { moveStepForward } = useGenerateStepsContext();
  const [selectedPrompts, setSelectedPrompts] = useState<Quote[]>(state.quotes);

  const handleSelect = (prompt: Quote) => {
    if (selectedPrompts.includes(prompt)) {
      setSelectedPrompts(selectedPrompts.filter((p) => p !== prompt));
    } else {
      setSelectedPrompts([...selectedPrompts, prompt]);
    }
  };

  const selectAll = () => {
    setSelectedPrompts(state.quotes);
  };

  const handleClick = () => {
    moveStepForward();
  };

  return (
    <div className="relative ">
      <div className="rounded-lg sm:w-[50vw] space-y-[32px] p-6 border border-secondary-50 bg-white bg-opacity-70 backdrop-blur-2xl">
        <div className="flex justify-between items-end ">
          <h2 className="font-bold text-lg leading-5 max-w-[320px]">
            Select the sentences you’d like to turn into videos
          </h2>
          <button
            className="text-secondary-400 text-sm font-semibold hover:underline cursor-pointer"
            onClick={selectAll}
          >
            Select All
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {state.quotes.map((prompt, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1 text-sm flex-grow">
                  <p>
                    <span className="font-bold">Setup</span>&nbsp;&nbsp;
                    {prompt.setup}
                  </p>
                  <p>
                    <span className="font-bold">InBetween</span>&nbsp;&nbsp;
                    {prompt.inBetween}
                  </p>
                  <p>
                    <span className="font-bold">Conclusion</span>&nbsp;&nbsp;
                    {prompt.conclusion}
                  </p>
                </div>
                <input
                  type="checkbox"
                  onChange={() => {
                    handleSelect(prompt);
                  }}
                  checked={selectedPrompts.includes(prompt)}
                  className="form-checkbox h-4 w-4 cursor-pointer"
                />
              </div>
              {/* Divider line */}
              {idx < state.quotes.length - 1 && (
                <hr className="border-t border-gray-300" />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <SecondaryButton onClick={handleClick}>
            <div className="flex items-center gap-2">
              <p>Generate</p>
              <SparklesIcon className="w-4 h-4" />
            </div>
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default PromptSelector;
