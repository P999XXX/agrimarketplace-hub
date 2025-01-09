import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { CommonTableHeader } from "./CommonTableHeader";

interface CommonTableEmptyProps {
  columns: { label: string; className?: string }[];
  message?: string;
}

export const CommonTableEmpty = ({ 
  columns,
  message = "No data found"
}: CommonTableEmptyProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <CommonTableHeader columns={columns} />
        <TableBody>
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-4">
              {message}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};