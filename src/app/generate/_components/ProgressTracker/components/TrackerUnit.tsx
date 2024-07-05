import { useEffect } from "react";

type Props = {
  label: string;
  index: number;
  state: "default" | "active" | "completed";
};

const TrackerUnit = ({ label, index, state }: Props) => {
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="flex gap-2 items-center">
      <div className="w-6 h-6 flex justify-center items-center border border-primary-700 rounded-full text-xs text-primary-700">
        {index}
      </div>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
};

export default TrackerUnit;
