import { Grid, Download, Table as TableIcon } from "lucide-react";
import { RoleFilter } from "@/components/team-members/filters/RoleFilter";
import { StatusFilter } from "@/components/team-members/filters/StatusFilter";
import { SortFilter } from "@/components/team-members/filters/SortFilter";
import { MobileFilterMenuGroup } from "./MobileFilterMenuGroup";
import { MobileFilterMenuItem } from "./MobileFilterMenuItem";

interface MobileFilterMenuContentProps {
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
  onClose: () => void;
}

export const MobileFilterMenuContent = ({
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
  onClose,
}: MobileFilterMenuContentProps) => {
  const handleRoleChange = (value: string) => {
    setRoleFilter?.(value);
    onClose();
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter?.(value);
    onClose();
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onClose();
  };

  const handleViewChange = () => {
    setViewMode(viewMode === "grid" ? "table" : "grid");
    onClose();
  };

  const handleExport = () => {
    onExport();
    onClose();
  };

  return (
    <>
      {showRoleFilter && roleFilter !== undefined && setRoleFilter && (
        <MobileFilterMenuGroup label="Role Filter">
          <RoleFilter value={roleFilter} onChange={handleRoleChange} />
        </MobileFilterMenuGroup>
      )}
      
      {showStatusFilter && statusFilter !== undefined && setStatusFilter && (
        <MobileFilterMenuGroup label="Status Filter">
          <StatusFilter value={statusFilter} onChange={handleStatusChange} />
        </MobileFilterMenuGroup>
      )}
      
      <MobileFilterMenuGroup label="Sort Options">
        <SortFilter value={sortBy} onChange={handleSortChange} />
      </MobileFilterMenuGroup>

      <MobileFilterMenuGroup label="Actions" showSeparator={false}>
        {showViewToggle && (
          <MobileFilterMenuItem 
            icon={viewMode === "grid" ? TableIcon : Grid}
            label="Change view"
            onClick={handleViewChange}
          />
        )}
        <MobileFilterMenuItem 
          icon={Download}
          label="Export Excel"
          onClick={handleExport}
        />
      </MobileFilterMenuGroup>
    </>
  );
};