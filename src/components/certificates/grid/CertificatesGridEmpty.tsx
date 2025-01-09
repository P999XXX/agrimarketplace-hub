import { FileText } from "lucide-react";
import { CommonCard } from "@/components/common/card/CommonCard";

export const CertificatesGridEmpty = () => {
  return (
    <CommonCard
      header={
        <div className="flex flex-col items-center gap-2">
          <FileText className="h-8 w-8 text-muted-foreground" />
          <h3 className="font-semibold text-lg">No certificates found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      }
      content={<div />}
      footer={<div />}
    />
  );
};