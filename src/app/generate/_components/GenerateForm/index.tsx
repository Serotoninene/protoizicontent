"use client";

import { useGenerateStepsContext } from "@/context/GenerateStepsContext";
/* eslint-disable */

import { useActions } from "ai/rsc";
import { useState } from "react";

import Divider from "@/ui/atoms/Divider";
import SecondaryButton from "@/ui/atoms/SecondaryButton";

import { Header, TextInput } from "./components";
import { AIAnswer } from "types";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

type Props = {
  prompts?: AIAnswer;
  updateState: (object: any) => void;
};

const adjustPrompt = (theme: string) =>
  `Give me ${theme} quotes in two sentences that will make me think about life and the universe. no more than 50 words`;

export default function GenerateForm({ updateState }: Props) {
  const options = ["Philosophy", "Self-Improvement", "Comedy"];
  const [prompt, setPrompt] = useState("");
  const { generateContent } = useActions();
  const { currentStep } = useGenerateStepsContext();

  const { moveStepForward } = useGenerateStepsContext();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const { object } = await generateContent(prompt);
        moveStepForward();
        await updateState(object);
      }}
      className="blurred_background-2xl flex flex-col gap-6 px-6 py-10 rounded-xl md:min-w-[536px]"
    >
      <Header />

      <ul className="flex justify-center items-center gap-8">
        {options.map((option) => (
          <SecondaryButton
            key={option}
            onClick={() => {
              setPrompt(adjustPrompt(option));
            }}
          >
            {option}
          </SecondaryButton>
        ))}
      </ul>

      <Divider />

      <TextInput />
    </form>
  );
}
