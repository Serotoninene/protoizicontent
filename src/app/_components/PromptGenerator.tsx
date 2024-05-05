"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";

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
      const promptArray = messages[messages.length - 1]!.content.split("\n\n");
      console.log(JSON.stringify(promptArray));
      setPrompts(promptArray[0]!.split("\n"));
    }
  }, [isLoading]);

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
  const [promptsToTransformInVideo, setPromptsToTransformInVideo] = useState<
    string[]
  >([]);

  const addPromptToTransform = (prompt: string) => {
    setPromptsToTransformInVideo((prevPrompts) => [...prevPrompts, prompt]);
  };

  useEffect(() => {
    const dummyPrompts = [
      '1. "The only true wisdom is in knowing you know nothing." - Socrates\n2. "He who has a why to live can bear almost any how." - Friedrich Nietzsche\n3. "To be is to be perceived." - George Berkeley\n4. "One cannot step twice in the same river." - Heraclitus\n5. "The unexamined life is not worth living." - Socrates\n6. "Man is condemned to be free." - Jean-Paul Sartre\n7. "If God did not exist, it would be necessary to invent Him." - Voltaire\n8. "Liberty consists in doing what one desires." - John Stuart Mill\n9. "Life must be understood backward. But it must be lived forwards." - Søren Kierkegaard\n10. "The limits of my language mean the limits of my world." - Ludwig Wittgenstein',
    ];

    setPrompts(dummyPrompts[0]!.split("\n"));
  }, []);

  if (prompts.length === 0)
    return (
      <div className="flex items-center justify-center w-full h-full bg-blue-300 max-w-md py-24 mx-auto stretch">
        <PromptButton
          prompt="give me 10 philosophical quote in two sentences that will make me think about life and the universe."
          setPrompts={setPrompts}
        />
      </div>
    );

  return (
    <div className="px-24 py-32">
      <h2>Hello</h2>
      <div className="flex flex-col gap-2">
        {prompts.map((prompt, i) => (
          <div key={i} className="flex justify-between">
            <label htmlFor={`prompt-${i}`}>{prompt}</label>
            <input id={`prompt-${i}`} type="checkbox" />
          </div>
        ))}
      </div>
      <button onClick={() => setPrompts([])}>Reset</button>
    </div>
  );
}
