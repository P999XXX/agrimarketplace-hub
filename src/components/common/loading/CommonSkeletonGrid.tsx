import { CommonSkeletonCard } from "./CommonSkeletonCard";

interface CommonSkeletonGridProps {
  count?: number;
}

export const CommonSkeletonGrid = ({ count = 6 }: CommonSkeletonGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CommonSkeletonCard key={i} />
      ))}
    </div>
  );
};