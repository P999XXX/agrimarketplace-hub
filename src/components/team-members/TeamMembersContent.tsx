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
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useToast } from "@/hooks/use-toast";

export const TeamMembersContent = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { data: teamMembers = [] } = useTeamMembers(searchQuery, roleFilter, sortBy);

  useEffect(() => {
    setViewMode(isMobile ? 'grid' : 'table');
  }, [isMobile]);

  const handleExportCSV = () => {
    try {
      // Convert team members data to CSV format
      const headers = ['Name', 'Email', 'Role', 'Status', 'Invited By', 'Created At'];
      const csvContent = [
        headers.join(','),
        ...teamMembers.map(member => [
          `"${member.name || ''}"`,
          `"${member.email}"`,
          `"${member.role}"`,
          `"${member.status}"`,
          `"${member.inviter?.first_name || ''} ${member.inviter?.last_name || ''}"`,
          `"${new Date(member.created_at).toLocaleDateString()}"`,
        ].join(','))
      ].join('\n');

      // Create a Blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `team-members-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "CSV Export Successful",
        description: "Your team members data has been exported successfully.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "There was an error exporting your team members data.",
      });
    }
  };

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
          onExportCSV={handleExportCSV}
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