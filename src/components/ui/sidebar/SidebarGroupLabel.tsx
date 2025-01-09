import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarGroupLabel.displayName = "SidebarGroupLabel";