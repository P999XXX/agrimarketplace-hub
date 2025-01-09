export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  label: string;
  options: FilterOption[];
}

export interface FilterState {
  searchQuery: string;
  categoryFilter: string;
  statusFilter: string;
  sortBy: string;
  roleFilter?: string;
}

export interface FilterActions {
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setStatusFilter: (status: string) => void;
  setSortBy: (sort: string) => void;
  setRoleFilter?: (role: string) => void;
}

export interface FilterContextType extends FilterState, FilterActions {}