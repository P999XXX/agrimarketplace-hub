import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {roleFilter !== "all" && (
        <Button
          variant="secondary"
          size="sm"
          className="h-7 text-xs font-normal"
          onClick={() => setRoleFilter("all")}
        >
          Role: {getRoleLabel(roleFilter)}
          <X className="ml-1 h-3 w-3" />
        </Button>
      )}
      
      {statusFilter !== "all" && (
        <Button
          variant="secondary"
          size="sm"
          className="h-7 text-xs font-normal"
          onClick={() => setStatusFilter("all")}
        >
          Status: {getStatusLabel(statusFilter)}
          <X className="ml-1 h-3 w-3" />
        </Button>
      )}
      
      {sortBy !== "created_at-desc" && (
        <Button
          variant="secondary"
          size="sm"
          className="h-7 text-xs font-normal"
          onClick={() => setSortBy("created_at-desc")}
        >
          Sort: {getSortLabel(sortBy)}
          <X className="ml-1 h-3 w-3" />
        </Button>
      )}
    </div>
  );
};