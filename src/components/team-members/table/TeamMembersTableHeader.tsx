import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface TeamMembersTableHeaderProps {
  onSelectAll: (checked: boolean) => void;
  allSelected: boolean;
  someSelected: boolean;
}

export const TeamMembersTableHeader = ({ 
  onSelectAll, 
  allSelected,
  someSelected 
}: TeamMembersTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox
            checked={allSelected}
            className="ml-4"
            onCheckedChange={onSelectAll}
            data-state={someSelected ? "indeterminate" : allSelected ? "checked" : "unchecked"}
          />
        </TableHead>
        <TableHead className="whitespace-nowrap">Name</TableHead>
        <TableHead className="whitespace-nowrap">Email</TableHead>
        <TableHead className="whitespace-nowrap">Role</TableHead>
        <TableHead className="whitespace-nowrap">Status</TableHead>
        <TableHead className="whitespace-nowrap">Invited by</TableHead>
        <TableHead className="whitespace-nowrap">Invited</TableHead>
      </TableRow>
    </TableHeader>
  );
};