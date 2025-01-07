import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { EmailCell } from "./EmailCell";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

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
  itemsPerPage,
}: TeamMembersTableProps) => {
  const { data: teamMembers, isLoading } = useTeamMembers();
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  const filteredMembers = teamMembers?.filter((member) => {
    const matchesSearch =
      member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const sortedMembers = [...(filteredMembers || [])].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return (a.name || "").localeCompare(b.name || "");
      case "email":
        return a.email.localeCompare(b.email);
      case "role":
        return (a.role || "").localeCompare(b.role || "");
      case "status":
        return (a.status || "").localeCompare(b.status || "");
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil((sortedMembers?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = sortedMembers?.slice(startIndex, endIndex);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentMembers?.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>
                <EmailCell email={member.email} />
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-brand-50/50 text-brand-700 border-0"
                >
                  {member.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${
                    member.status === "pending"
                      ? "bg-yellow-50/50 text-yellow-700"
                      : "bg-green-50/50 text-green-700"
                  } border-0`}
                >
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                      onClick={() => setSelectedMember(member.id)}
                    >
                      Delete Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};