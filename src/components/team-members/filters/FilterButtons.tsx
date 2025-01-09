import { Filter, ArrowUpDown } from "lucide-react";
import { CommonFilterButtons } from "@/components/common/filters/CommonFilterButtons";

interface FilterButtonsProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExportCSV: () => void;
  searchQuery: string;
  showViewToggle?: boolean;
}

export const FilterButtons = ({
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExportCSV,
  showViewToggle = true,
}: FilterButtonsProps) => {
  const filters = [
    {
      icon: <Filter className="h-4 w-4 mr-2" />,
      label: "Role",
      value: roleFilter,
      onChange: setRoleFilter,
      options: [
        { value: "all", label: "All roles" },
        { value: "member", label: "Member" },
        { value: "viewer", label: "Viewer" },
      ],
    },
    {
      icon: <Filter className="h-4 w-4 mr-2" />,
      label: "Status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: "all", label: "All status" },
        { value: "pending", label: "Pending" },
        { value: "accepted", label: "Accepted" },
        { value: "declined", label: "Declined" },
      ],
    },
    {
      icon: <ArrowUpDown className="h-4 w-4 mr-2" />,
      label: "Sort",
      value: sortBy,
      onChange: setSortBy,
      options: [
        { value: "created_at-desc", label: "Newest first" },
        { value: "created_at-asc", label: "Oldest first" },
        { value: "name-asc", label: "Name A-Z" },
        { value: "name-desc", label: "Name Z-A" },
      ],
    },
  ];

  return (
    <CommonFilterButtons
      filters={filters}
      viewMode={viewMode}
      setViewMode={setViewMode}
      onExport={onExportCSV}
      showViewToggle={showViewToggle}
    />
  );
};