import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useCertificatesQuery } from "@/hooks/certificates/useCertificatesQuery";
import { Certificate } from "./types";
import { Separator } from "@/components/ui/separator";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
            <CardHeader className="p-3 sm:p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-muted animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <Separator className="w-full bg-border" />
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </CardContent>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {filteredCertificates.map((certificate) => (
        <CertificateCard key={certificate.id} certificate={certificate} />
      ))}
    </div>
  );
};

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'valid':
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    case 'expired':
      return 'bg-red-100 text-red-700 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  const isNew = Date.now() - new Date(certificate.created_at).getTime() < 3000;

  return (
    <Card className={`transition-all duration-500 hover:shadow-md bg-card border-border ${
      isNew ? 'animate-highlight' : ''
    }`}>
      <CardHeader className="p-3 sm:p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[hsl(var(--chart-1))] flex items-center justify-center flex-shrink-0 text-white text-sm sm:text-base font-medium`}>
              {certificate.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-base sm:text-lg font-semibold text-card-foreground truncate">
                {certificate.name}
              </p>
              <div className="text-sm text-muted-foreground truncate">
                {certificate.category}
              </div>
            </div>
          </div>
          <Badge className={getStatusBadgeClass(certificate.status)}>
            {certificate.status}
          </Badge>
        </div>
      </CardHeader>

      <Separator className="w-full bg-border" />

      <CardContent className="p-4 sm:p-6">
        <div className="text-sm text-muted-foreground space-y-2">
          <div className="flex justify-between">
            <span>File Size:</span>
            <span>{Math.round(certificate.file_size / 1024)} KB</span>
          </div>
          <div className="flex justify-between">
            <span>File Type:</span>
            <span>{certificate.file_type.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span>Expires:</span>
            <span>{format(new Date(certificate.expiry_date), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </CardContent>

      <Separator className="w-full bg-border" />
      
      <CardFooter className="p-3 sm:p-4 min-h-[60px]">
        <div className="flex items-center justify-end w-full gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
          >
            <Download className="h-4 w-4" />
            <span className="sr-only">Download certificate</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete certificate</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
