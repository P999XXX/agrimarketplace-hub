import { useCertificatesQuery } from "@/hooks/certificates/useCertificatesQuery";
import { CertificateCard } from "./grid/CertificateCard";
import { CertificatesGridLoading } from "./grid/CertificatesGridLoading";
import { CertificatesGridEmpty } from "./grid/CertificatesGridEmpty";

export const CertificatesGrid = ({
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
  });

  if (isLoading) {
    return <CertificatesGridLoading />;
  }

  if (!filteredCertificates?.length) {
    return <CertificatesGridEmpty />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {filteredCertificates.map((certificate) => (
        <CertificateCard key={certificate.id} certificate={certificate} />
      ))}
    </div>
  );
};