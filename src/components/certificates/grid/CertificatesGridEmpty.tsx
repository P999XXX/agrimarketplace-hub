import { CommonEmptyState } from "@/components/common/empty/CommonEmptyState";

export const CertificatesGridEmpty = () => {
  return (
    <CommonEmptyState
      title="No certificates found"
      description="Try adjusting your search or filters"
    />
  );
};