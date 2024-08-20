"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const isExtendedContext = createContext<{
  isExtended: boolean;
  setIsExtended: (e: boolean) => void;
}>({
  isExtended: false,
  setIsExtended: () => {
    console.warn("setIsExtended function has not been provided");
  },
});

export const IsExtendedProvider = ({ children }: { children: ReactNode }) => {
  const [isExtended, setIsExtended] = useState(false);
  const value = useMemo(() => ({ isExtended, setIsExtended }), [isExtended]);

  return (
    <isExtendedContext.Provider value={value}>
      {children}
    </isExtendedContext.Provider>
  );
};

export const useIsExtendedContext = () => {
  const context = useContext(isExtendedContext);

  if (context === undefined) {
    throw new Error(
      "useIsExtendedContext must be used within a IsExtendedProvider",
    );
  }

  return context;
};
