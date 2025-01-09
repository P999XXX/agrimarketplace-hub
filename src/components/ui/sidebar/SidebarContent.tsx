import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ScrollArea className="flex-1">
        <div
          ref={ref}
          className={cn("flex-1", className)}
          {...props}
        >
          {children}
        </div>
      </ScrollArea>
    );
  }
);

SidebarContent.displayName = "SidebarContent";