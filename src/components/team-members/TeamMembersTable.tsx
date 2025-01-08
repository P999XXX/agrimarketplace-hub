import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { EmailCell } from "./EmailCell";

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

  const totalPages = Math.ceil(allTeamMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const teamMembers = allTeamMembers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRoleBadgeClass = () => {
    return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'accepted':
        return 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400 hover:bg-success-100 dark:hover:bg-success-900/30';
      case 'pending':
        return 'bg-warning-50 text-warning-700 dark:bg-warning-900/20 dark:text-warning-400 hover:bg-warning-100 dark:hover:bg-warning-900/30';
      case 'declined':
      case 'inactive':
        return 'bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400 hover:bg-error-100 dark:hover:bg-error-900/30';
      default:
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load team members'}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <div className="space-y-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name / Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Invited By</TableHead>
            <TableHead>Invited</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-6 w-20 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-6 w-24 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-6 w-28 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-6 w-28 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-6 w-28 bg-muted animate-pulse rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  }

  if (allTeamMembers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-lg">No team members found</p>
        <p className="text-muted-foreground/60 text-sm mt-2">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name / Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Invited By</TableHead>
              <TableHead>Invited</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="space-y-1">
                    <div className="font-medium">{member.name || 'Unnamed User'}</div>
                    <EmailCell email={member.email} />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeClass()}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(member.status)}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {member.last_login ? format(new Date(member.last_login), 'MMM d, yyyy') : 'Never'}
                </TableCell>
                <TableCell>
                  {member.inviter?.first_name || ''} {member.inviter?.last_name || ''}
                </TableCell>
                <TableCell>
                  {format(new Date(member.created_at), 'MMM d, yyyy')}
                </TableCell>
              </TableRow>
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
                className={`flex items-center justify-center h-9 w-9 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                className={`flex items-center justify-center h-9 w-9 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
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