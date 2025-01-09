import { CommonTableLoading } from "@/components/common/table/CommonTableLoading";
import { CommonSkeletonFilters } from "@/components/common/loading/CommonSkeletonFilters";

export const CertificatesTableLoading = () => {
  const columns = [
    { label: "Name" },
    { label: "Category" },
    { label: "Status" },
    { label: "Expiry Date" },
    { label: "Actions", className: "w-[100px]" }
  ];

  return (
    <div className="space-y-6">
      <CommonSkeletonFilters />
      <CommonTableLoading columns={columns} />
    </div>
  );
};