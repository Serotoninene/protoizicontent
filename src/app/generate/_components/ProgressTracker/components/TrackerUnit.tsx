import clsx from "clsx";
import type { TrackerStates } from "../index";

type Props = {
  label: string;
  index: number;
  state?: TrackerStates;
};

const TrackerUnit = ({ label, index, state }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <div
        className={clsx(
          "w-6 h-6 flex justify-center items-center rounded-full text-xs text-primary-700 transition duration-300 ease-in-out",
          {
            "text-primary-700 border border-primary-700": state === "default",
            "bg-primary-700 text-white ": state === "active",
            "bg-secondary-400 text-white": state === "completed",
          },
        )}
      >
        {index}
      </div>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
};

export default TrackerUnit;
