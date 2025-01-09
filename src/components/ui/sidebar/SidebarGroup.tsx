import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarGroup.displayName = "SidebarGroup";