import * as React from "react";

type SidebarState = "expanded" | "collapsed";

interface SidebarContextValue {
  state: SidebarState;
  setState: (state: SidebarState) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: SidebarProviderProps) {
  const [state, setState] = React.useState<SidebarState>(
    defaultOpen ? "expanded" : "collapsed"
  );
  const isMobile = React.useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );

  const toggleSidebar = React.useCallback(() => {
    setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"));
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        state,
        setState,
        toggleSidebar,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}