import { CommonFilterChips } from "@/components/common/filters/CommonFilterChips";

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
  const filters = [
    {
      label: "Role",
      value: roleFilter,
      defaultValue: "all",
      getLabel: (value: string) => {
        switch (value) {
          case "member":
            return "Member";
          case "viewer":
            return "Viewer";
          default:
            return "";
        }
      },
      onReset: setRoleFilter,
    },
    {
      label: "Status",
      value: statusFilter,
      defaultValue: "all",
      getLabel: (value: string) => {
        switch (value) {
          case "pending":
            return "Pending";
          case "accepted":
            return "Accepted";
          case "declined":
            return "Declined";
          default:
            return "";
        }
      },
      onReset: setStatusFilter,
    },
    {
      label: "Sort",
      value: sortBy,
      defaultValue: "date-desc",
      getLabel: (value: string) => {
        switch (value) {
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
      },
      onReset: setSortBy,
    },
  ];

  return <CommonFilterChips filters={filters} />;
};