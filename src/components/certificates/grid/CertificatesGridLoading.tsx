import { CommonCard } from "@/components/common/card/CommonCard";
import { CommonSkeletonFilters } from "@/components/common/loading/CommonSkeletonFilters";

export const CertificatesGridLoading = () => {
  return (
    <div className="space-y-6">
      <CommonSkeletonFilters />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <CommonCard
            key={i}
            header={
              <div className="animate-pulse flex items-start justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-muted" />
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-muted rounded" />
                    <div className="h-4 w-40 bg-muted rounded" />
                  </div>
                </div>
              </div>
            }
            content={
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
            }
            footer={<div />}
          />
        ))}
      </div>
    </div>
  );
};