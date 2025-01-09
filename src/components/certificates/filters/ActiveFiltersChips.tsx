import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

  return (
    <div className="[padding-top:0px_!important] [padding-bottom:0px_!important] [margin-top:10px_!important] [margin-bottom:-12px_!important]">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-1.8 [padding-left:0px_!important] [padding-right:0px_!important]">
          {categoryFilter !== "all" && (
            <Button
              variant="secondary"
              size="sm"
              className="h-6 text-[11px] font-normal bg-gray-100 hover:bg-gray-200 text-gray-600"
              onClick={() => setCategoryFilter("all")}
            >
              Category: {getCategoryLabel(categoryFilter)}
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
          
          {sortBy !== "date-desc" && (
            <Button
              variant="secondary"
              size="sm"
              className="h-6 text-[11px] font-normal bg-gray-100 hover:bg-gray-200 text-gray-600"
              onClick={() => setSortBy("date-desc")}
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