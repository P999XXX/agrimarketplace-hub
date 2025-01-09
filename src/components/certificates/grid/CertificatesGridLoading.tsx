import { CommonSkeletonFilters } from "@/components/common/loading/CommonSkeletonFilters";
import { CommonSkeletonGrid } from "@/components/common/loading/CommonSkeletonGrid";

export const CertificatesGridLoading = () => {
  return (
    <div className="space-y-6">
      <CommonSkeletonFilters />
      <CommonSkeletonGrid />
    </div>
  );
};