import { Skeleton } from "@/components/ui/skeleton";

export const CommonSkeletonFilters = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Search Input Skeleton */}
      <div className="relative flex-1 w-full">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Desktop Filter Buttons Skeleton */}
      <div className="hidden md:flex items-center gap-2">
        <Skeleton className="h-10 w-[180px]" />
        <Skeleton className="h-10 w-[180px]" />
        <Skeleton className="h-10 w-[180px]" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
      </div>

      {/* Mobile Filter Button Skeleton */}
      <div className="md:hidden">
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  );
};