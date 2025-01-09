import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
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

SidebarFooter.displayName = "SidebarFooter";