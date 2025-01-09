import { CommonActiveFiltersChips } from "@/components/common/filters/CommonActiveFiltersChips";

interface ActiveFiltersChipsProps {
  categoryFilter: string;
  statusFilter: string;
  sortBy: string;
  setCategoryFilter: (category: string) => void;
  setStatusFilter: (status: string) => void;
  setSortBy: (sort: string) => void;
}

export const ActiveFiltersChips = ({
  categoryFilter,
  statusFilter,
  sortBy,
  setCategoryFilter,
  setStatusFilter,
  setSortBy,
}: ActiveFiltersChipsProps) => {
  const getSortLabel = (sort: string) => {
    switch (sort) {
      case "date-desc":
        return "Newest first";
      case "date-asc":
        return "Oldest first";
      case "name-asc":
        return "Name A-Z";
      case "name-desc":
        return "Name Z-A";
      default:
        return "";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "organic":
        return "Organic";
      case "quality":
        return "Quality";
      case "safety":
        return "Safety";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "valid":
        return "Valid";
      case "expired":
        return "Expired";
      default:
        return "";
    }
  };

  const filters = [
    {
      value: categoryFilter,
      defaultValue: "all",
      label: "Category",
      getLabel: getCategoryLabel,
      onReset: setCategoryFilter,
    },
    {
      value: statusFilter,
      defaultValue: "all",
      label: "Status",
      getLabel: getStatusLabel,
      onReset: setStatusFilter,
    },
    {
      value: sortBy,
      defaultValue: "date-desc",
      label: "Sort",
      getLabel: getSortLabel,
      onReset: setSortBy,
    },
  ];

  return <CommonActiveFiltersChips filters={filters} />;
};