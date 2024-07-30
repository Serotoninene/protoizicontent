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
  return <div>{JSON.stringify(prompts)}</div>;
};

export default PromptSelector;
