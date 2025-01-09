import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useCertificatesQuery } from "@/hooks/certificates/useCertificatesQuery";
import { Certificate } from "./types";

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
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!filteredCertificates?.length) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <FileText className="h-8 w-8 text-muted-foreground" />
          <h3 className="font-semibold text-lg">No certificates found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCertificates.map((certificate) => (
        <CertificateCard key={certificate.id} certificate={certificate} />
      ))}
    </div>
  );
};

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">{certificate.name}</h3>
            <p className="text-sm text-muted-foreground">{certificate.category}</p>
          </div>
          <Badge 
            variant={certificate.status === "valid" ? "default" : "destructive"}
          >
            {certificate.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Expires: </span>
            {format(new Date(certificate.expiry_date), "PP")}
          </div>
          {certificate.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {certificate.description}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};