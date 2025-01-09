import { Table, TableBody } from "@/components/ui/table";
import { useCertificatesQuery } from "@/hooks/certificates/useCertificatesQuery";
import { CertificatesTableHeader } from "./table/CertificatesTableHeader";
import { CertificatesTableRow } from "./table/CertificatesTableRow";
import { CertificatesTableLoading } from "./table/CertificatesTableLoading";
import { CertificatesTableEmpty } from "./table/CertificatesTableEmpty";

export const CertificatesTable = ({
  searchQuery,
  categoryFilter,
  statusFilter,
  sortBy,
}: {
  searchQuery: string;
  categoryFilter: string;
  statusFilter: string;
  sortBy: string;
}) => {
  const { data: certificates, isLoading } = useCertificatesQuery();

  const filteredCertificates = certificates?.filter((cert) => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || cert.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || cert.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "date-asc":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "date-desc":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return 0;
    }
  });

  if (isLoading) {
    return <CertificatesTableLoading />;
  }

  if (!filteredCertificates?.length) {
    return <CertificatesTableEmpty />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <CertificatesTableHeader />
        <TableBody>
          {filteredCertificates.map((certificate) => (
            <CertificatesTableRow 
              key={certificate.id} 
              certificate={certificate} 
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};