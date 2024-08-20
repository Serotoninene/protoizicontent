import React, {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type GenerateStepsContextType = {
  steps: string[];
  currentStep: number;
  moveStepForward: () => void;
};

const GenerateStepsContext = createContext<GenerateStepsContextType>({
  steps: [],
  currentStep: 0,
  moveStepForward: () => {
    console.warn("moveStepForward function has not been provided");
  },
});

export const GenerateStepsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const steps = ["Theme", "Select", "Done"];
  const [currentStep, setCurrentStep] = useState(0);

  const moveStepForward = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
  };

  const value = useMemo(
    () => ({
      steps,
      currentStep,
      moveStepForward,
    }),
    [currentStep],
  );

  return (
    <GenerateStepsContext.Provider value={value}>
      {children}
    </GenerateStepsContext.Provider>
  );
};

export const useGenerateStepsContext = () => {
  const context = useContext(GenerateStepsContext);

  if (context === undefined) {
    throw new Error(
      "useGenerateStepsContext must be used within a GenerateStepsProvider",
    );
  }

  return context;
};
