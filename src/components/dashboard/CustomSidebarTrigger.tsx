import { useEffect } from "react";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export const CustomSidebarTrigger = () => {
  const { state, toggleSidebar } = useSidebar();

  useEffect(() => {
    localStorage.setItem('sidebarState', state);
  }, [state]);

  return (
    <button 
      onClick={toggleSidebar}
      className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
    >
      {state === "expanded" ? (
        <PanelLeftClose size={20} className="text-gray-900" />
      ) : (
        <PanelLeftOpen size={20} className="text-gray-900" />
      )}
    </button>
  );
};