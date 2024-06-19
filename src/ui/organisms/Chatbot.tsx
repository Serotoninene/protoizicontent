"use client";

import { useState } from "react";
import { type CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";
import { continueConversation } from "@/app/actions/ai";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// type Props = {}

export default function Chatbot() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");

  return (
    <div className="fixed bottom-2 right-4 h-[400px] w-[320px] flex flex-col gap-2 justify-between bg-red-300 ">
      <div className="flex-grow bg-blue-300">
        {messages.map((m, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content as string}
          </div>
        ))}
      </div>

      <form
        action={async () => {
          const newMessages: CoreMessage[] = [
            ...messages,
            { content: input, role: "user" },
          ];

          setMessages(newMessages);
          setInput("");

          const result = await continueConversation(newMessages);

          for await (const content of readStreamableValue(result)) {
            setMessages([
              ...newMessages,
              {
                role: "assistant",
                content: content ?? "I have no response for that.",
              },
            ]);
          }
        }}
      >
        <input
          className=" w-full max-w-md p-2  border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
