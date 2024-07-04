import { IsExtendedProvider } from "@/context/isExtendedContext";
import { SidebarFooter, SidebarHeader } from "./components/SidebarContent";

export default function Sidebar() {
  return (
    <div className="relative top-0 bottom-0">
      <div className="absolute h-24 w-8 top-4 left-2 bg-secondary-400 rounded-md"></div>
      <div className="absolute h-24 w-8 bottom-4 left-2 bg-secondary-400 rounded-md"></div>
      <div className="flex flex-col h-full justify-between rounded-lg px-6 py-7 border border-secondary-50 bg-opacity-70 backdrop-blur-2xl">
        <IsExtendedProvider>
          <SidebarHeader />
          <SidebarFooter />
        </IsExtendedProvider>
      </div>
    </div>
  );
}
