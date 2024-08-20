import React, { createContext, useContext } from "react";
import { useStreamableState } from "@/utils/hooks/useStreamableState";
import type { AIAnswer } from "types";

type StreamableStateContextType = {
  state: AIAnswer;
  updateState: (newState: Partial<AIAnswer>) => void;
};

const StreamableStateContext = createContext<
  StreamableStateContextType | undefined
>(undefined);

export const StreamableStateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, updateState] = useStreamableState<AIAnswer>({
    quotes: [],
  });

  return (
    <StreamableStateContext.Provider value={{ state, updateState }}>
      {children}
    </StreamableStateContext.Provider>
  );
};

export const useStreamableStateContext = () => {
  const context = useContext(StreamableStateContext);
  if (context === undefined) {
    throw new Error(
      "useStreamableStateContext must be used within a StreamableStateProvider",
    );
  }
  return context;
};
