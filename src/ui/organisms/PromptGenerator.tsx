"use client";

import { useChat } from "ai/react";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

// HERE IS THE FLOW OF THE COMPONENTS

function PromptButton({
  prompt,
  setPrompts,
}: {
  prompt: string;
  setPrompts: (prompts: string[]) => void;
}) {
  const { messages, setInput, handleSubmit, isLoading, setMessages } =
    useChat();

  useEffect(() => {
    if (!isLoading && messages[messages.length - 1]) {
      const promptArray = messages[messages.length - 1]?.content;
      if (promptArray) setPrompts(promptArray?.split("\n"));
    }
  }, [isLoading, messages]);

  if (isLoading)
    return (
      <div className="w-full bg-red-100">
        {messages.map((m) => {
          if (m.role === "assistant") return <div key={m.id}>{m.content}</div>;
        })}
      </div>
    );

  return (
    <form onSubmit={handleSubmit}>
      <button
        className="rounded-md border border-black px-4 py-2 hover:bg-slate-100"
        onClick={() => {
          setMessages([]);
          setInput(prompt);
        }}
      >
        Type here
      </button>
    </form>
  );
}

export default function PromptGenerator() {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [promptNb, setPromptNb] = useState("10");
  const [promptsToTransformInVideo, setPromptsToTransformInVideo] = useState<
    string[]
  >([]);

  const togglePromptToTransform = (prompt: string) => {
    const newArray = [...promptsToTransformInVideo];
    if (newArray.includes(prompt)) {
      newArray.splice(newArray.indexOf(prompt), 1);
    } else {
      newArray.push(prompt);
    }

    setPromptsToTransformInVideo(newArray);
  };

  const handleVideoGeneration = async () => {
    console.log("Generating videos for prompts: ", promptsToTransformInVideo);
    try {
      const response = await fetch("/api/creatomate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompts: promptsToTransformInVideo }),
      });

      const responseData = (await response.json()) as NextResponse; // Parse JSON response

      console.log("Response Data: ", responseData);
    } catch (error) {
      console.error("An error occurred while fetching the data.");
    }
  };

  if (prompts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full bg-blue-300 max-w-md py-24 mx-auto stretch">
        <h2>How many videos would you like to generate ?</h2>
        <input type="number" onChange={(e) => setPromptNb(e.target.value)} />
        <PromptButton
          prompt={`give me ${promptNb} personnal development quote in two sentences that will make me think about life and the universe.`}
          setPrompts={setPrompts}
        />
      </div>
    );

  return (
    <div className="px-24 py-32">
      <div className="flex flex-col gap-2">
        {prompts.map((prompt, i) => (
          <div key={i} className="flex justify-between">
            <label htmlFor={`prompt-${i}`}>{prompt}</label>
            <input
              id={`prompt-${i}`}
              type="checkbox"
              onClick={(e) => {
                e.stopPropagation();
                togglePromptToTransform(prompt);
              }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleVideoGeneration}
        disabled={promptsToTransformInVideo.length === 0}
      >
        Generate video(s)
      </button>
      <button onClick={() => setPrompts([])}>Reset</button>
    </div>
  );
}
