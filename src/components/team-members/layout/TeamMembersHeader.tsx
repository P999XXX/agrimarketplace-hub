import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { InviteMemberForm } from "../InviteMemberForm";
import { TeamMembersFilters } from "../TeamMembersFilters";
import { Dispatch, SetStateAction } from "react";

interface TeamMembersHeaderProps {
  view: "grid" | "table";
  onViewChange: Dispatch<SetStateAction<"grid" | "table">>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onExportCSV: () => void;
  isMobile: boolean;
}

export const TeamMembersHeader = ({ 
  view, 
  onViewChange,
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onExportCSV,
  isMobile
}: TeamMembersHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Team Members
        </h1>
        <div className="hidden md:block">
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader className="text-left">
                <SheetTitle className="text-2xl">Invite Team Member</SheetTitle>
              </SheetHeader>
              <InviteMemberForm />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <TeamMembersFilters
        viewMode={view}
        setViewMode={onViewChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onExportCSV={onExportCSV}
        isMobile={isMobile}
      />
    </div>
  );
};