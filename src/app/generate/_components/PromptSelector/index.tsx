import React from "react";
import type { AIAnswer } from "types";

type Props = {
  prompts: AIAnswer;
};

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

const PromptSelector = ({ prompts }: Props) => {
  return (
    <div className="relative">
      <div className="rounded-lg p-6 border border-secondary-50 bg-white bg-opacity-70 backdrop-blur-2xl">
        <h2 className="">
          Select the sentences you’d like to turn into videos
        </h2>
      </div>
    </div>
  );
};

export default PromptSelector;
