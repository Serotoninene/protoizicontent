"use client";

import { useGenerateStepsContext } from "@/context/GenerateStepsContext";
/* eslint-disable */

import { useRef, useState } from "react";
import { useActions } from "ai/rsc";

import Divider from "@/ui/atoms/Divider";
import SecondaryButton from "@/ui/atoms/SecondaryButton";

import { Header, TextInput } from "./components";
import gsap from "gsap";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

type Props = {
  updateState: (object: any) => void;
};

const adjustPrompt = (theme: string) =>
  `Give me ${theme} quotes in two sentences that will make me think about life and the universe. no more than 50 words`;

export default function GenerateForm({ updateState }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const options = ["Philosophy", "Self-Improvement", "Comedy"];
  const [prompt, setPrompt] = useState("");
  const { generateContent } = useActions();

  const { moveStepForward } = useGenerateStepsContext();

  return (
    <div ref={container} className="relative overflow-">
      <div className="absolute h-24 w-8 top-4 left-2 bg-secondary-400 rounded-md"></div>
      <div className="absolute rounded-full h-20 w-20 bottom-44 right-2 bg-secondary-400"></div>
      <div className="absolute rounded-full h-32 w-40 bottom-4 right-2 bg-secondary-400"></div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { object } = await generateContent(prompt);
          if (object && container.current) {
            moveStepForward();
            gsap.to(container.current, {
              xPercent: -200,
              onComplete: () => {
                container.current!.style.display = "none";
              },
            });
          }
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
    </div>
  );
}
