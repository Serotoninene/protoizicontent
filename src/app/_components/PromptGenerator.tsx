"use client";

import { useChat } from "ai/react";

export default function PromptGenerator() {
  const { messages, setInput, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <button
          onClick={() => {
            setInput("give me 10 ideas for a video on tiktok");
          }}
        >
          Type here
        </button>
      </form>
    </div>
  );
}
