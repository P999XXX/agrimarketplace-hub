import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { forwardRef } from "react";

interface CommonMobileFilterButtonsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const CommonMobileFilterButtons = forwardRef<
  HTMLButtonElement,
  CommonMobileFilterButtonsProps
>(({ onClick, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      className={`h-10 w-10 shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none ${className}`}
      onClick={onClick}
      {...props}
    >
      <ListFilter className="h-4 w-4" />
    </Button>
  );
});

CommonMobileFilterButtons.displayName = "CommonMobileFilterButtons";