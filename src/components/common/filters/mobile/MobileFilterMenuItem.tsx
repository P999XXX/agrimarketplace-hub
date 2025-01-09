import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";

interface MobileFilterMenuItemProps {
  icon?: LucideIcon;
  label: string;
  onClick: () => void;
}

export const MobileFilterMenuItem = ({ icon: Icon, label, onClick }: MobileFilterMenuItemProps) => {
  return (
    <DropdownMenuItem 
      onClick={onClick}
      className="cursor-pointer px-2 py-1.5 hover:bg-accent focus:bg-accent"
    >
      <div className="flex items-center gap-2 w-full pl-2">
        {Icon && <Icon className="h-4 w-4" />}
        <span>{label}</span>
      </div>
    </DropdownMenuItem>
  );
};