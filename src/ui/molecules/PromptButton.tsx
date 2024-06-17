"use client";

import { useChat } from "ai/react";
import { useEffect } from "react";

// HERE IS THE FLOW OF THE COMPONENTS
export default function PromptButton({
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
