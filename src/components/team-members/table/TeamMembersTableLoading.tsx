import { TableCell, TableRow } from "@/components/ui/table";

export const TeamMembersTableLoading = () => {
  return (
    <div className="space-y-3">
      <div className="h-8 bg-gray-200 animate-pulse rounded" />
      <div className="h-12 bg-gray-100 animate-pulse rounded" />
      <div className="h-12 bg-gray-100 animate-pulse rounded" />
      <div className="h-12 bg-gray-100 animate-pulse rounded" />
    </div>
  );
};