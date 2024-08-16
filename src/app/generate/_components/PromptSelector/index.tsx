import React from "react";
import type { AIAnswer } from "types";

type Props = {
  prompts: AIAnswer;
};

const PromptSelector = ({ prompts }: Props) => {
  return (
    <div className="relative ">
      <div className="rounded-lg sm:w-[50vw] space-y-[32px] p-6 border border-secondary-50 bg-white bg-opacity-70 backdrop-blur-2xl">
        <div className="flex justify-between items-end ">
          <h2 className="font-bold text-lg leading-5 max-w-[320px]">
            Select the sentences you’d like to turn into videos
          </h2>
          <button className="text-secondary-400">Unselect All</button>
        </div>
        <div className="flex flex-col gap-4">
          {prompts.quotes.map((prompt, idx) => (
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
                  className="form-checkbox h-4 w-4 cursor-pointer"
                />
              </div>
              {/* Divider line */}
              {idx < prompts.quotes.length - 1 && (
                <hr className="border-t border-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptSelector;
