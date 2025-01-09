import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { CertificatesTableHeader } from "./CertificatesTableHeader";

export const CertificatesTableEmpty = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <CertificatesTableHeader />
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              No certificates found
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};