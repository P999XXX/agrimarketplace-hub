import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";

interface MobileFilterMenuHeaderProps {
  label: string;
}

export const MobileFilterMenuHeader = ({ label }: MobileFilterMenuHeaderProps) => {
  return (
    <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
      {label}
    </DropdownMenuLabel>
  );
};