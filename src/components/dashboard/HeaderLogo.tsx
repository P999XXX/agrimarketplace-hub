import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "@/components/auth/Logo";

export const HeaderLogo = () => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  
  if (!isMobile && state === "expanded") {
    return null;
  }
  
  return <Logo />;
};