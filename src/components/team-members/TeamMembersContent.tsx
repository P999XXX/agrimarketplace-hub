import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { TeamMembersGrid } from "./TeamMembersGrid";

export const TeamMembersContent = () => {
  // State Management
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // CSV Export Handler
  const handleExportCSV = () => {
    // TODO: Implement CSV export functionality
    console.log('Export CSV');
  };

  return (
    <Card className="border-0 shadow-none">
      <TeamMembersHeader />
      <CardContent className="p-0">
        <div className="px-6">
          <TeamMembersFilters 
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onExportCSV={handleExportCSV}
          />
          {viewMode === 'table' ? (
            <TeamMembersTable 
              searchQuery={searchQuery}
              roleFilter={roleFilter}
              sortBy={sortBy}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          ) : (
            <TeamMembersGrid
              searchQuery={searchQuery}
              roleFilter={roleFilter}
              sortBy={sortBy}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};