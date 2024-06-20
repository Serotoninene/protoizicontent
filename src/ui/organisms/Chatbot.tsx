/* eslint-disable */

"use client";

import { AI } from "@/app/actions/ai";
import { CoreMessage } from "ai";
import { readStreamableValue, useActions } from "ai/rsc";
import { useState } from "react";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  display: string;
};

// Using streaming text
export default function Chatbot() {
  const { continueConversation } = useActions<typeof AI>();
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");

  return (
    <div className="fixed bottom-2 right-4 h-[400px] w-[320px] flex flex-col gap-2 justify-between bg-red-300">
      <ul className="overflow-y-scroll">
        {messages?.map((message, id) => (
          <li key={id}>{message.content as string}</li>
        ))}
      </ul>

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
                content: content as string,
              },
            ]);
          }
        }}
      >
        <input
          type="text"
          name="message"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className=" w-full max-w-md p-2  border border-gray-300 rounded shadow-xl"
          placeholder="Say something..."
        />
      </form>
    </div>
  );
}

// // Using generateText
// export default function Chatbot() {
//   const { sendMessage } = useActions<typeof AI>();
//   const [messages, setMessages] = useState<ChatMessage[]>([]);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const newMessage: ChatMessage = {
//       id: Date.now().toString(), // Convert Date.now() to string to match the 'id' type
//       role: "user",
//       display: (e.target as HTMLFormElement).message.value,
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessage]);

//     const rawResponse = await sendMessage(
//       (e.target as HTMLFormElement).message.value,
//     );
//     const response = JSON.parse(rawResponse);

//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { id: Date.now().toString(), role: "assistant", display: response.text },
//     ]);
//   };

//   return (
//     <div className="fixed bottom-2 right-4 h-[400px] w-[320px] flex flex-col gap-2 justify-between bg-red-300">
//       <ul className="overflow-y-scroll">
//         {messages?.map((message: ClientMessage) => (
//           <li key={message.id}>{message.display}</li>
//         ))}
//       </ul>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="message"
//           className=" w-full max-w-md p-2  border border-gray-300 rounded shadow-xl"
//           placeholder="Say something..."
//         />
//       </form>
//     </div>
//   );
// }
