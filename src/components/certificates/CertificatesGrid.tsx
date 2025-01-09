import { Card } from "@/components/ui/card";

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4">
        <p>Certificate Grid Item (Coming soon)</p>
      </Card>
    </div>
  );
};