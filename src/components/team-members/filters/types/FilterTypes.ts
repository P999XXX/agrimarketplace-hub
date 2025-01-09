export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  label: string;
  options: FilterOption[];
}

export interface CommonFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export interface FilterButtonsProps extends CommonFilterProps {
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