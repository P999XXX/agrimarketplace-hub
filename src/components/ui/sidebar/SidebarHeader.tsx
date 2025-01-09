import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-none", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarHeader.displayName = "SidebarHeader";