import { useEffect, useRef } from "react";
import type { TrackerStates } from "../index";

import gsap from "gsap";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/20/solid";

type Props = {
  label: string;
  index: number;
  state?: TrackerStates;
};

const TrackerUnit = ({ label, index, state }: Props) => {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const checkIconRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.to([labelRef.current, checkIconRef.current], {
      yPercent: -100,
      delay: 1,
      onComplete: () => {
        console.log("completed");
      },
    });
  }, []);
  return (
    <div className="flex gap-2 items-center">
      <div
        className={clsx(
          "w-6 h-6 flex_center rounded-full text-xs text-primary-700 transition duration-300 ease-in-out",
          {
            "text-primary-700 border border-primary-700": state === "default",
            "bg-primary-700 text-white ": state === "active",
            "bg-secondary-500 text-white": state === "completed",
          },
        )}
      >
        <div className="relative">
          <p ref={labelRef} className="pr-[1px] w-4 text-center">
            {index}
          </p>
          <p ref={checkIconRef} className="absolute top-full">
            <CheckIcon className="text-white w-4" />
          </p>
        </div>
      </div>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
};

export default TrackerUnit;
