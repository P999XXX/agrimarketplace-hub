import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    <div className="[padding-top:0px_!important] [padding-bottom:0px_!important] [margin-top:10px_!important] [margin-bottom:-12px_!important]">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-1.8 [padding-left:0px_!important] [padding-right:0px_!important]">
          {roleFilter !== "all" && (
            <Button
              variant="secondary"
              size="sm"
              className="h-6 text-[11px] font-normal bg-gray-100 hover:bg-gray-200 text-gray-600"
              onClick={() => setRoleFilter("all")}
            >
              Role: {getRoleLabel(roleFilter)}
              <X className="ml-1 h-2.5 w-2.5" />
            </Button>
          )}
          
          {statusFilter !== "all" && (
            <Button
              variant="secondary"
              size="sm"
              className="h-6 text-[11px] font-normal bg-gray-100 hover:bg-gray-200 text-gray-600"
              onClick={() => setStatusFilter("all")}
            >
              Status: {getStatusLabel(statusFilter)}
              <X className="ml-1 h-2.5 w-2.5" />
            </Button>
          )}
          
          {sortBy !== "created_at-desc" && (
            <Button
              variant="secondary"
              size="sm"
              className="h-6 text-[11px] font-normal bg-gray-100 hover:bg-gray-200 text-gray-600"
              onClick={() => setSortBy("created_at-desc")}
            >
              Sort: {getSortLabel(sortBy)}
              <X className="ml-1 h-2.5 w-2.5" />
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal" className="h-0.5" />
      </ScrollArea>
    </div>
  );
};