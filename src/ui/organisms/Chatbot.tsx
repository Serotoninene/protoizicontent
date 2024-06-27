/* eslint-disable */

"use client";

import { ClientMessage } from "@/app/actions/ai.tsx";
import { generateId } from "ai";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Using streaming text
export default function Chatbot() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <div className="fixed flex flex-col  bottom-0 w-[360px] h-[420px] right-4">
      <div className="overflow-y-scroll">
        {conversation.map((message: ClientMessage) => (
          <div key={message.id}>
            {message.role}: {message.display}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button
          onClick={async () => {
            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              { id: generateId(), role: "user", display: input },
            ]);

            const message = await continueConversation(input);

            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              message,
            ]);
          }}
        >
          Send Message
        </button>
      </div>
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
