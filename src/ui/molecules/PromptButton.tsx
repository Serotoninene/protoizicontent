"use client";

import { useUser } from "@clerk/nextjs";
import type { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect } from "react";

interface Props {
  prompt: string;
  conversationId: string | undefined;
  initialMessages: Message[];
  setPrompts: (prompts: string[]) => void;
}

export default function PromptButton({
  prompt,
  initialMessages,
  conversationId,
  setPrompts,
}: Props) {
  const { user } = useUser();

  const { messages, setInput, handleSubmit, isLoading, setMessages } = useChat({
    body: {
      conversation_id: conversationId,
    },
    initialMessages: initialMessages,
  });

  useEffect(() => {
    if (!isLoading && messages[messages.length - 1]) {
      const promptArray = messages[messages.length - 1]?.content;
      if (promptArray) setPrompts(promptArray?.split("\n"));
    }
  }, [isLoading, messages]);

  // if (isLoading)
  //   return (
  //     <div className="w-full bg-red-100">
  //       {messages.map((m) => {
  //         if (m.role === "assistant") return <div key={m.id}>{m.content}</div>;
  //       })}
  //     </div>
  //   );

  return (
    <form onSubmit={handleSubmit}>
      <button
        className="rounded-md border border-black px-4 py-2 hover:bg-slate-100 disabled:cursor-not-allowed"
        disabled={!user}
        onClick={() => {
          setMessages([]);
          setInput(prompt);
        }}
      >
        Type here
      </button>
      <div className="w-full bg-red-100">
        {messages.map((m) => {
          if (m.role === "assistant") return <div key={m.id}>{m.content}</div>;
        })}
      </div>
    </form>
  );
}
