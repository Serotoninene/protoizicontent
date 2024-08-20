import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import type { Quote } from "types";

const SelectedPromptsContext = createContext<{
  selectedPrompts: Quote[];
  setSelectedPrompts: (prompts: Quote[]) => void;
}>({
  selectedPrompts: [],
  setSelectedPrompts: () => {
    console.warn("setSelectedPrompts function has not been provided");
  },
});

export const SelectedPromptsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedPrompts, setSelectedPrompts] = useState<Quote[]>([]);

  const value = useMemo(
    () => ({ selectedPrompts, setSelectedPrompts }),
    [selectedPrompts],
  );

  return (
    <SelectedPromptsContext.Provider value={value}>
      {children}
    </SelectedPromptsContext.Provider>
  );
};

export const useSelectedPromptsContext = () => {
  const context = useContext(SelectedPromptsContext);

  if (context === undefined) {
    throw new Error(
      "useSelectedPromptsContext must be used within a SelectedPromptsProvider",
    );
  }

  return context;
};
