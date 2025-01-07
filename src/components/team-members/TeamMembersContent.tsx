import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { InviteMemberForm } from "./InviteMemberForm";
import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus } from "lucide-react";

export const TeamMembersContent = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  useEffect(() => {
    setViewMode(isMobile ? 'grid' : 'table');
  }, [isMobile]);

  const MobileInviteButton = () => (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-full">
            <Plus className="h-5 w-5 mr-2" />
            Invite Member
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-[450px] sm:max-w-full h-full">
          <SheetHeader>
            <SheetTitle className="text-2xl">Invite Team Member</SheetTitle>
          </SheetHeader>
          <InviteMemberForm />
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <div className="container pt-4 pb-8 md:pb-8">
      <div className="pb-16 md:pb-0">
        <TeamMembersHeader />
        <TeamMembersFilters 
          viewMode={viewMode} 
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        {viewMode === 'table' ? (
          <TeamMembersTable 
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            sortBy={sortBy}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={10}
          />
        ) : (
          <TeamMembersGrid 
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            sortBy={sortBy}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={9}
          />
        )}
      </div>
      {isMobile && <MobileInviteButton />}
    </div>
  );
};