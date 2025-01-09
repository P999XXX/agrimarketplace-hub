import { useState } from "react";

interface UseFiltersProps {
  defaultView?: "grid" | "table";
  defaultSort?: string;
  defaultFilters?: Record<string, string>;
}

export const useFilters = ({
  defaultView = "table",
  defaultSort = "created_at-desc",
  defaultFilters = {},
}: UseFiltersProps = {}) => {
  const [view, setView] = useState<"grid" | "table">(defaultView);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(defaultSort);
  const [filters, setFilters] = useState<Record<string, string>>(defaultFilters);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSortBy(defaultSort);
    setSearchQuery("");
  };

  const hasActiveFilters = () => {
    return (
      searchQuery !== "" ||
      sortBy !== defaultSort ||
      Object.entries(filters).some(
        ([key, value]) => value !== defaultFilters[key]
      )
    );
  };

  return {
    view,
    setView,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
};