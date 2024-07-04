import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function BlurContainer({ children, className }: Props) {
  return (
    <div className="relative">
      <div className="absolute h-1/6 w-1/3 top-4 left-2 bg-secondary-400 rounded-md"></div>
      <div className="absolute h-1/6 w-1/3 bottom-4 left-2 bg-secondary-400 rounded-md"></div>
      <div
        className={`border border-secondary-50 bg-opacity-70 backdrop-blur-2xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
