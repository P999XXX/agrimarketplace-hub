import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { InviteMemberForm } from "./InviteMemberForm";
import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { TeamMembersPagination } from "./TeamMembersPagination";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTeamMembers } from "@/hooks/useTeamMembers";

export const TeamMembersContent = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const { data: allTeamMembers = [] } = useTeamMembers(searchQuery, roleFilter, sortBy);

  useEffect(() => {
    setViewMode(isMobile ? 'grid' : 'table');
  }, [isMobile]);

  const MobileInviteButton = () => (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
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
    <div className="container h-[calc(100vh-4rem)] flex flex-col lg:py-4">
      <div className="flex-none">
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
      </div>
      
      <div className="flex-1 min-h-0 flex flex-col">
        <ScrollArea className="h-full lg:px-1 flex-1">
          <div className="h-full pb-14 lg:pb-0">
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
        </ScrollArea>
        <div className="hidden lg:flex h-12 flex-none border-t bg-white items-center justify-center shadow-sm">
          {allTeamMembers.length > (viewMode === 'table' ? 10 : 9) && (
            <TeamMembersPagination 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={allTeamMembers.length}
              itemsPerPage={viewMode === 'table' ? 10 : 9}
            />
          )}
        </div>
      </div>
      {isMobile && <MobileInviteButton />}
    </div>
  );
};