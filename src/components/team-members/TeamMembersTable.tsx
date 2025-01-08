import { Table, TableBody } from "@/components/ui/table";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, Trash2, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TeamMembersTableHeader } from "./table/TeamMembersTableHeader";
import { TeamMembersTableRow } from "./table/TeamMembersTableRow";
import { TeamMembersTableLoading } from "./table/TeamMembersTableLoading";
import { TeamMembersTableEmpty } from "./table/TeamMembersTableEmpty";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface TeamMembersTableProps {
  searchQuery: string;
  roleFilter: string;
  sortBy: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

export const TeamMembersTable = ({ 
  searchQuery, 
  roleFilter, 
  sortBy,
  currentPage,
  setCurrentPage,
  itemsPerPage
}: TeamMembersTableProps) => {
  const { data: allTeamMembers = [], isLoading, error } = useTeamMembers(searchQuery, roleFilter, sortBy);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { toast } = useToast();

  const totalPages = Math.ceil(allTeamMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const teamMembers = allTeamMembers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(teamMembers.map(member => member.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleSelectMember = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers(prev => [...prev, memberId]);
    } else {
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedMembers.length) return;
    
    // TODO: Implement bulk delete functionality
    toast({
      title: "Bulk delete",
      description: `${selectedMembers.length} members selected for deletion`,
    });
  };

  const handleBulkExport = () => {
    if (!selectedMembers.length) return;

    const selectedData = allTeamMembers.filter(member => 
      selectedMembers.includes(member.id)
    );

    // Create CSV content
    const headers = ["Name", "Email", "Role", "Status", "Invited By", "Invited"];
    const csvContent = [
      headers.join(","),
      ...selectedData.map(member => [
        member.name || "Unnamed User",
        member.email,
        member.role,
        member.status,
        `${member.inviter?.first_name || ''} ${member.inviter?.last_name || ''}`.trim(),
        new Date(member.created_at).toLocaleDateString()
      ].join(","))
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "team-members.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export complete",
      description: `${selectedMembers.length} members exported to CSV`,
    });
  };

  const getRoleBadgeClass = () => {
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'accepted':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
      case 'declined':
      case 'inactive':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load team members'}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <TeamMembersTableLoading />;
  }

  if (allTeamMembers.length === 0) {
    return <TeamMembersTableEmpty />;
  }

  return (
    <div className="space-y-6">
      {selectedMembers.length > 0 && (
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected ({selectedMembers.length})
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBulkExport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Selected ({selectedMembers.length})
          </Button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TeamMembersTableHeader 
            onSelectAll={handleSelectAll}
            allSelected={selectedMembers.length === teamMembers.length && teamMembers.length > 0}
            someSelected={selectedMembers.length > 0 && selectedMembers.length < teamMembers.length}
          />
          <TableBody>
            {teamMembers.map((member) => (
              <TeamMembersTableRow
                key={member.id}
                member={member}
                getRoleBadgeClass={getRoleBadgeClass}
                getStatusBadgeClass={getStatusBadgeClass}
                isSelected={selectedMembers.includes(member.id)}
                onSelect={(checked) => handleSelectMember(member.id, checked)}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                onClick={() => currentPage !== 1 && handlePageChange(1)}
                className={`flex ${currentPage === 1 ? 'opacity-50' : ''}`}
              >
                <ChevronsLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="gap-1 px-2.5"
                >
                  <ChevronLeft className="h-4 w-4" />
                </PaginationPrevious>
              </PaginationItem>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="gap-1 px-2.5"
                >
                  <ChevronRight className="h-4 w-4" />
                </PaginationNext>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                onClick={() => currentPage !== totalPages && handlePageChange(totalPages)}
                className={`flex ${currentPage === totalPages ? 'opacity-50' : ''}`}
              >
                <ChevronsRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};