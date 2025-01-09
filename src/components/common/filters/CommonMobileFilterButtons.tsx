import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

interface CommonMobileFilterButtonsProps {
  onClick: () => void;
  className?: string;
}

export const CommonMobileFilterButtons = ({
  onClick,
  className,
}: CommonMobileFilterButtonsProps) => {
  return (
    <Button
      variant="outline"
      className={`h-10 shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none ${className}`}
      onClick={onClick}
    >
      <ListFilter className="h-4 w-4" />
    </Button>
  );
};