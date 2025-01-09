import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { CommonTableHeader } from "./CommonTableHeader";
import { Skeleton } from "@/components/ui/skeleton";

interface CommonTableLoadingProps {
  columns: { label: string; className?: string }[];
  rowCount?: number;
}

export const CommonTableLoading = ({ 
  columns,
  rowCount = 3
}: CommonTableLoadingProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <CommonTableHeader columns={columns} />
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-4 w-3/4" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};