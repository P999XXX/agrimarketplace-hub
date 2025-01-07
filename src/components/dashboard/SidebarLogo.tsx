import { useSidebar } from "@/components/ui/sidebar";
import { Logo } from "@/components/auth/Logo";

export const SidebarLogo = () => {
  const { state } = useSidebar();
  
  if (state === "collapsed") {
    return null;
  }
  
  return <Logo />;
};