import { useSidebarState } from "@/hooks/use-sidebar-state";
import { useEffect } from "react";

export const SidebarRoot = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen } = useSidebarState();
  
  useEffect(() => {
    const sidebar = document.querySelector('[data-state]');
    if (!sidebar) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-state') {
          const isOpen = sidebar.getAttribute('data-state') === 'open';
          setIsOpen(isOpen);
        }
      });
    });

    observer.observe(sidebar, { attributes: true });

    return () => observer.disconnect();
  }, [setIsOpen]);

  return <>{children}</>;
};