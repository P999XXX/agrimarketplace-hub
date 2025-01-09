import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { CertificatesTableHeader } from "./CertificatesTableHeader";
import { CommonSkeletonFilters } from "@/components/common/loading/CommonSkeletonFilters";

export const CertificatesTableLoading = () => {
  return (
    <div className="space-y-6">
      <CommonSkeletonFilters />
      
      <div className="rounded-md border">
        <Table>
          <CertificatesTableHeader />
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell colSpan={5}>
                  <div className="animate-pulse flex items-center space-x-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};