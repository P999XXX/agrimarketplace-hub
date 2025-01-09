import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarMenu = React.forwardRef<HTMLDivElement, SidebarMenuProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarMenu.displayName = "SidebarMenu";