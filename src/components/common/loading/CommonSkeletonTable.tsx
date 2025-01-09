import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { CommonTableHeader } from "../table/CommonTableHeader";
import { Skeleton } from "@/components/ui/skeleton";

interface CommonSkeletonTableProps {
  columns: { label: string; className?: string }[];
  rowCount?: number;
}

export const CommonSkeletonTable = ({ 
  columns,
  rowCount = 3
}: CommonSkeletonTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <CommonTableHeader columns={columns} />
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((_, colIndex) => (
                <TableCell key={colIndex}>
                  {colIndex === 0 ? (
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ) : (
                    <Skeleton className="h-4 w-24" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};