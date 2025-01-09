import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CommonMobileFilterButtons } from "./CommonMobileFilterButtons";
import { MobileFilterMenuContent } from "./mobile/MobileFilterMenuContent";

interface CommonMobileFilterMenuProps {
  roleFilter?: string;
  setRoleFilter?: (role: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExport: () => void;
  showViewToggle?: boolean;
  showRoleFilter?: boolean;
  showStatusFilter?: boolean;
}

export const CommonMobileFilterMenu = ({
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExport,
  showViewToggle = true,
  showRoleFilter = true,
  showStatusFilter = true,
}: CommonMobileFilterMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <CommonMobileFilterButtons />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[240px] bg-background border border-border shadow-md" 
        sideOffset={8}
      >
        <MobileFilterMenuContent
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExport={onExport}
          showViewToggle={showViewToggle}
          showRoleFilter={showRoleFilter}
          showStatusFilter={showStatusFilter}
          onClose={() => setIsOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};