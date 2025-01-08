import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export const CustomSidebarTrigger = () => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <button 
      onClick={toggleSidebar}
      className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
    >
      {state === "expanded" ? (
        <ChevronLeft className="h-5 w-5 text-gray-500" />
      ) : (
        <ChevronRight className="h-5 w-5 text-gray-500" />
      )}
    </button>
  );
};