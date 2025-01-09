import { CommonActiveFiltersChips } from "@/components/common/filters/CommonActiveFiltersChips";

interface ActiveFiltersChipsProps {
  roleFilter: string;
  statusFilter: string;
  sortBy: string;
  setRoleFilter: (role: string) => void;
  setStatusFilter: (status: string) => void;
  setSortBy: (sort: string) => void;
}

export const ActiveFiltersChips = ({
  roleFilter,
  statusFilter,
  sortBy,
  setRoleFilter,
  setStatusFilter,
  setSortBy,
}: ActiveFiltersChipsProps) => {
  const getSortLabel = (sort: string) => {
    switch (sort) {
      case "created_at-desc":
        return "Newest first";
      case "created_at-asc":
        return "Oldest first";
      case "name-asc":
        return "Name A-Z";
      case "name-desc":
        return "Name Z-A";
      default:
        return "";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "member":
        return "Member";
      case "viewer":
        return "Viewer";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "accepted":
        return "Accepted";
      case "declined":
        return "Declined";
      default:
        return "";
    }
  };

  const filters = [
    {
      value: roleFilter,
      defaultValue: "all",
      label: "Role",
      getLabel: getRoleLabel,
      onReset: setRoleFilter,
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
      defaultValue: "created_at-desc",
      label: "Sort",
      getLabel: getSortLabel,
      onReset: setSortBy,
    },
  ];

  return <CommonActiveFiltersChips filters={filters} />;
};