import { TableCell } from "@/components/ui/table";
import { format } from "date-fns";

interface TableCellDateProps {
  date: string | null;
  fallback?: string;
}

export const TableCellDate = ({ date, fallback = 'Never' }: TableCellDateProps) => {
  return (
    <TableCell className="text-muted-foreground">
      {date ? format(new Date(date), 'MMM d, yyyy') : fallback}
    </TableCell>
  );
};