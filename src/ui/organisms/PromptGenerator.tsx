"use client";

import { useEffect, useState } from "react";
import type { NextResponse } from "next/server";
import PromptButton from "../molecules/PromptButton";

import type { CoreMessage, Message } from "ai";

type Conversation = {
  id: string;
  userId: string;
  moodId: string;
  createdAt: Date | null;
};

type Props = {
  conversation: Conversation | undefined;
};

export default function PromptGenerator({ conversation }: Props) {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [promptNb, setPromptNb] = useState("10");
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
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
    try {
      const response = await fetch("/api/creatomate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompts: promptsToTransformInVideo }),
      });

      (await response.json()) as NextResponse; // Parse JSON response
    } catch (error) {}
  };

  useEffect(() => {
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation_id: conversation?.id }),
    })
      .then((res) => res.json())
      .then((data) => setInitialMessages(data as Message[]))
      .catch((err) => console.log(err));
  }, []);

  if (prompts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full bg-blue-300 max-w-md py-24 mx-auto stretch">
        <h2>How many videos would you like to generate ?</h2>
        <input type="number" onChange={(e) => setPromptNb(e.target.value)} />
        <PromptButton
          initialMessages={initialMessages}
          conversationId={conversation.id}
          prompt={`what is the last quote you gave me ?`}
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
