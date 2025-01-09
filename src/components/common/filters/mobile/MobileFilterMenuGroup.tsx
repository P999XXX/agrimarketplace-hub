import { DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MobileFilterMenuHeader } from "./MobileFilterMenuHeader";
import { ReactNode } from "react";

interface MobileFilterMenuGroupProps {
  label: string;
  children: ReactNode;
  showSeparator?: boolean;
}

export const MobileFilterMenuGroup = ({ 
  label, 
  children, 
  showSeparator = true 
}: MobileFilterMenuGroupProps) => {
  return (
    <>
      <DropdownMenuGroup>
        <MobileFilterMenuHeader label={label} />
        {children}
      </DropdownMenuGroup>
      {showSeparator && <DropdownMenuSeparator />}
    </>
  );
};