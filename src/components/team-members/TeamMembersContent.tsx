import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { InviteMemberForm } from "./InviteMemberForm";
import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { useIsMobile } from "@/hooks/use-mobile";

export const TeamMembersContent = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const isMobile = useIsMobile();

  // Set initial view mode based on screen size
  useEffect(() => {
    setViewMode(isMobile ? 'grid' : 'table');
  }, [isMobile]);

  return (
    <div className="container py-8">
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
        />
      ) : (
        <TeamMembersGrid 
          searchQuery={searchQuery}
          roleFilter={roleFilter}
          sortBy={sortBy}
        />
      )}
    </div>
  );
};