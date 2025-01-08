import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListFilter, ArrowUpDown, Grid, Download, Table as TableIcon } from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { utils, writeFile } from 'xlsx';
import { useToast } from "@/hooks/use-toast";

interface MobileFilterMenuProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExportCSV: () => void;
  searchQuery: string;
}

export const MobileFilterMenu = ({
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExportCSV,
  searchQuery,
}: MobileFilterMenuProps) => {
  const { data: teamMembers = [], isLoading } = useTeamMembers(searchQuery, roleFilter, sortBy);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      if (isLoading) {
        toast({
          title: "Please wait",
          description: "The data is still loading...",
          variant: "default",
        });
        return;
      }

      if (teamMembers.length === 0) {
        toast({
          title: "No data to export",
          description: "There are no team members matching your current filters.",
          variant: "default",
        });
        return;
      }

      // Format data for Excel
      const exportData = teamMembers.map(member => ({
        Name: member.name || member.email,
        Email: member.email,
        Role: member.role,
        Status: member.status,
        'Invited By': member.inviter ? `${member.inviter.first_name || ''} ${member.inviter.last_name || ''}`.trim() : '',
        'Invited On': new Date(member.created_at).toLocaleDateString(),
        'Last Login': member.last_login ? new Date(member.last_login).toLocaleDateString() : 'Never'
      }));

      // Create workbook and worksheet
      const wb = utils.book_new();
      const ws = utils.json_to_sheet(exportData);

      // Add worksheet to workbook
      utils.book_append_sheet(wb, ws, "Team Members");

      // Generate filename with current date
      const date = new Date().toISOString().split('T')[0];
      const fileName = `team-members-${date}.xlsx`;

      // Save file
      writeFile(wb, fileName);

      toast({
        title: "Export successful",
        description: "Your team members list has been downloaded.",
        variant: "default",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none"
        >
          <ListFilter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full border-0 shadow-none focus:ring-0 focus-visible:ring-0">
            <div className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              <SelectValue placeholder="Filter by role" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full border-0 shadow-none focus:ring-0 focus-visible:ring-0">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at-desc">Newest first</SelectItem>
            <SelectItem value="created_at-asc">Oldest first</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenuItem 
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          className="cursor-pointer p-2"
        >
          <div className="flex items-center gap-2">
            {viewMode === "grid" ? <TableIcon className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            <span>Change view</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={handleExport}
          className="cursor-pointer p-2"
        >
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export Excel</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};