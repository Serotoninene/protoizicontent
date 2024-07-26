"use client";
/* eslint-disable */

import Divider from "@/ui/atoms/Divider";
import SecondaryButton from "@/ui/atoms/SecondaryButton";
import { readStreamableValue, useActions } from "ai/rsc";
import { useState } from "react";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const Header = () => (
  <div>
    <h2 className="text-xl font-bold mb-1">Choose a theme</h2>
    <p className="text-sm text-primary-400">
      Pick one of the pre-registered topics
    </p>
  </div>
);

const TextInput = () => (
  <div className="flex flex-col gap-3">
    <label htmlFor="prompt" className="text-sm text-primary-400">
      Type in the precise topic you seek.
    </label>
    <div className="relative">
      <textarea
        id="prompt"
        placeholder="Give me content for videos about ..."
        className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-2xl py-3 px-4 h-24 text-sm focus:outline-none resize-none"
      />
      <div className="absolute bottom-4 right-4 px-3 py-2 text-primary-400 text-xs font-medium bg-white rounded-full">
        ⌘ + Ent
      </div>
    </div>
  </div>
);

const adjustPrompt = (theme: string) =>
  `Give me a  new ${theme} quote in two sentences that will make me think about life and the universe. no more than 50 words`;

export default function GenerateForm() {
  const options = ["Philosophy", "Self-Improvement", "Comedy"];
  const [prompt, setPrompt] = useState("");
  const { generateContent } = useActions();

  return (
    <div className="relative">
      <div className="absolute h-24 w-8 top-4 left-2 bg-secondary-400 rounded-md"></div>
      <div className="absolute rounded-full h-20 w-20 bottom-44 right-2 bg-secondary-400"></div>
      <div className="absolute rounded-full h-32 w-40 bottom-4 right-2 bg-secondary-400"></div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const object = await generateContent(prompt);
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
    </div>
  );
}
