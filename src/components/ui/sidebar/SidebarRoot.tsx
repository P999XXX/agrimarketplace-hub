import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sidebar" | "floating";
  collapsible?: "icon" | "full";
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const SidebarRoot = React.forwardRef<HTMLDivElement, SidebarRootProps>(
  ({ className, variant = "sidebar", collapsible, defaultOpen = true, open, onOpenChange, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-state={open ? "expanded" : "collapsed"}
        data-variant={variant}
        data-collapsible={collapsible}
        className={cn(
          "group relative flex h-full flex-none transition-all duration-300",
          variant === "floating" && "absolute left-0 top-0 z-50",
          collapsible === "icon" && "w-[280px] data-[state=collapsed]:w-[72px]",
          collapsible === "full" && "w-[280px] data-[state=collapsed]:w-0",
          !collapsible && "w-[280px]",
          className
        )}
        {...props}
      >
        <div className="flex h-full w-full flex-col bg-background group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow">
          {children}
        </div>
      </div>
    );
  }
);

SidebarRoot.displayName = "SidebarRoot";