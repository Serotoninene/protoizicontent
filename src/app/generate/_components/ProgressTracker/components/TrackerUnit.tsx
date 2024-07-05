import { useEffect, useRef } from "react";
import type { TrackerState } from "../index";

import gsap, { Power3 } from "gsap";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/20/solid";

type Props = {
  label: string;
  index: number;
  state?: TrackerState;
  isLast?: boolean;
};

type DividerLineProps = {
  isLast?: boolean;
  defaultLineRef: React.RefObject<HTMLDivElement>;
  completedLineRef: React.RefObject<HTMLDivElement>;
};

function DividerLine({
  isLast,
  defaultLineRef,
  completedLineRef,
}: DividerLineProps) {
  if (isLast) return null;

  return (
    <div className="relative w-10 h-[1px] overflow-hidden">
      <div ref={defaultLineRef} className="h-full w-full bg-primary-700"></div>
      <div
        ref={completedLineRef}
        className="absolute bg-secondary-500 inset-0"
      />
    </div>
  );
}

const TrackerUnit = ({ label, index, state, isLast }: Props) => {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const checkIconRef = useRef<HTMLParagraphElement>(null);
  const defaultLineRef = useRef<HTMLDivElement>(null);
  const completedLineRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    gsap.set(completedLineRef.current, {
      xPercent: -100,
    });

    tl.current = gsap.timeline({
      paused: true,
      defaults: {
        ease: Power3.easeOut,
        duration: 0.3,
      },
    });

    tl.current.to([labelRef.current, checkIconRef.current], {
      yPercent: -100,
    });

    tl.current.to(defaultLineRef.current, {
      xPercent: 100,
    });

    tl.current.to(
      completedLineRef.current,
      {
        xPercent: 0,
      },
      "+=0.1",
    );
  }, []);

  useEffect(() => {
    if (state === "completed") {
      tl.current?.play();
    }
  }, [state]);

  return (
    <div
      className={`flex items-center  gap-2 ${state === "default" ? "opacity-80" : ""}`}
    >
      <div
        className={clsx(
          "w-6 h-6 flex_center rounded-full text-xs text-primary-700 transition duration-300 ease-out",
          {
            "text-primary-700 border border-primary-700": state === "default",
            "bg-primary-700 text-white ": state === "active",
            "bg-secondary-500 text-white": state === "completed",
          },
        )}
      >
        <div className="relative overflow-hidden">
          <p ref={labelRef} className="pr-[1px] w-3 text-center">
            {index}
          </p>
          <p ref={checkIconRef} className="absolute top-full">
            <CheckIcon className="text-white w-3 h-4" />
          </p>
        </div>
      </div>
      <p
        className={`text-sm font-semibold transition duration-300 ease-out ${state === "completed" ? "text-secondary-500" : ""}`}
      >
        {label}
      </p>

      {/* Separating lines */}
      <DividerLine
        isLast={isLast}
        defaultLineRef={defaultLineRef}
        completedLineRef={completedLineRef}
      />
    </div>
  );
};

export default TrackerUnit;
