import { TableCell, TableRow } from "@/components/ui/table";
import { EmailCell } from "../EmailCell";
import { ChevronRight } from "lucide-react";
import { TeamMember } from "@/hooks/useTeamMembers";
import { TableUserAvatar } from "./TableUserAvatar";
import { StatusBadge } from "../components/badges/StatusBadge";
import { RoleBadge } from "../components/badges/RoleBadge";
import { TableCellDate } from "../components/table/TableCellDate";
import { getColorScheme, getInitials } from "../utils/colorSchemes";
import { useState, useEffect } from "react";

interface TeamMembersTableRowProps {
  member: TeamMember;
}

export const TeamMembersTableRow = ({ member }: TeamMembersTableRowProps) => {
  const initials = getInitials(member.name || '', member.email);
  const colorScheme = getColorScheme(initials);
  const isNew = Date.now() - new Date(member.created_at).getTime() < 3000;
  const [showHighlight, setShowHighlight] = useState(false);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setShowHighlight(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  return (
    <TableRow className={`hover:bg-muted/50 ${showHighlight ? 'animate-highlight' : ''}`}>
      <TableCell>
        <TableUserAvatar
          initials={initials}
          colorScheme={colorScheme}
          name={member.name}
        />
      </TableCell>
      <TableCell>
        <EmailCell email={member.email} />
      </TableCell>
      <TableCell>
        <RoleBadge role={member.role} />
      </TableCell>
      <TableCell>
        <StatusBadge status={member.status} />
      </TableCell>
      <TableCellDate date={member.last_login} />
      <TableCell className="text-muted-foreground">
        {member.inviter?.first_name || ''} {member.inviter?.last_name || ''}
      </TableCell>
      <TableCellDate date={member.created_at} />
      <TableCell className="text-right p-0 pr-4">
        <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
      </TableCell>
    </TableRow>
  );
};