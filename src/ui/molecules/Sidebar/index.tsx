import { IsExtendedProvider } from "@/context/isExtendedContext";
import SidebarContent from "./components/SidebarContent";

export default function Sidebar() {
  return (
    <div className="relative">
      <div className="absolute h-24 w-8 top-4 left-2 bg-secondary-400 rounded-md"></div>
      <div className="flex flex-col justify-between rounded-lg px-6 py-7 border border-white bg-opacity-70 backdrop-blur-2xl">
        <IsExtendedProvider>
          <SidebarContent />
        </IsExtendedProvider>
      </div>
    </div>
  );
}
