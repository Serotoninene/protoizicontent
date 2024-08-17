import { useGenerateStepsContext } from "@/context/GenerateStepsContext";
import gsap, { Power3 } from "gsap";
import React, { useEffect, useRef } from "react";

type Props = { children: React.ReactNode; relatedStep: number };

const DURATION = 0.5;
const EASE = Power3.easeOut;

const StepContainer = ({ children, relatedStep }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const { currentStep } = useGenerateStepsContext();

  useEffect(() => {
    if (currentStep < relatedStep) {
      gsap.set(container.current, { display: "none" });
    }

    if (currentStep > relatedStep) {
      gsap.to(container.current, {
        xPercent: -200,
        duration: DURATION,
        ease: EASE,
        onComplete: () => {
          container.current!.style.display = "none";
        },
      });
    }

    if (currentStep === relatedStep) {
      const tl = gsap.timeline({
        delay: DURATION,
        defaults: { ease: EASE, duration: DURATION },
      });
      tl.set(container.current, {
        opacity: 1,
        display: "block",
        xPercent: relatedStep === 0 ? 0 : 200,
      });
      tl.to(container.current, {
        xPercent: 0,
      });
    }
  }, [currentStep]);

  return (
    <div ref={container} className="relative opacity-0">
      <div className="absolute h-24 w-8 top-4 left-2 bg-secondary-400 rounded-md"></div>
      <div className="absolute rounded-full h-20 w-20 bottom-[45%] right-2 bg-secondary-400"></div>
      <div className="absolute rounded-full h-32 w-40 bottom-4 right-2 bg-secondary-400"></div>
      {children}
    </div>
  );
};

export default StepContainer;
