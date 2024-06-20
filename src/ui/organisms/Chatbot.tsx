/* eslint-disable */

"use client";

import { FormEvent } from "react";
import { useActions, useUIState } from "ai/rsc";
import { AI, ClientMessage, UIState } from "@/app/actions/ai";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Chatbot() {
  const { sendMessage } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setMessages((prevMessages: UIState[]) => [
      ...prevMessages,
      {
        id: Date.now(),
        role: "user",
        display: e.target.message.value,
      },
    ]);

    const rawResponse = await sendMessage(e.target.message.value);

    const response = JSON.parse(rawResponse);

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), role: "assistant", display: response.text },
    ]);
  };

  return (
    <div className="fixed bottom-2 right-4 h-[400px] w-[320px] flex flex-col gap-2 justify-between bg-red-300 ">
      <ul>
        {messages?.map((message: ClientMessage) => (
          <li key={message.id}>{message.display}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          className=" w-full max-w-md p-2  border border-gray-300 rounded shadow-xl"
          placeholder="Say something..."
        />
      </form>
    </div>
  );
}
