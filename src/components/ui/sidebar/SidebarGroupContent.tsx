import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroupContent = React.forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-1", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarGroupContent.displayName = "SidebarGroupContent";