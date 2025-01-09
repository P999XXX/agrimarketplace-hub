import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Certificate } from "../types";
import { CommonCard } from "@/components/common/card/CommonCard";
import { CommonAvatar } from "@/components/common/avatar/CommonAvatar";
import { getInitials, getColorScheme } from "@/utils/colorSchemes";

interface CertificateCardProps {
  certificate: Certificate;
}

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

export const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const initials = getInitials(certificate.name, '');
  const colorScheme = getColorScheme(initials);
  const isNew = Date.now() - new Date(certificate.created_at).getTime() < 3000;

  const header = (
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-3 sm:space-x-4">
        <CommonAvatar initials={initials} colorScheme={colorScheme} />
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
  );

  const content = (
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
  );

  const footer = (
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
  );

  return (
    <CommonCard
      header={header}
      content={content}
      footer={footer}
      isHighlighted={isNew}
    />
  );
};