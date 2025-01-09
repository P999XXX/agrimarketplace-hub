import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarMenuItem = React.forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarMenuItem.displayName = "SidebarMenuItem";