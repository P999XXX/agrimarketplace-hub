import { CommonTableEmpty } from "@/components/common/table/CommonTableEmpty";

export const CertificatesTableEmpty = () => {
  const columns = [
    { label: "Name" },
    { label: "Category" },
    { label: "Status" },
    { label: "Expiry Date" },
    { label: "Actions", className: "w-[100px]" }
  ];

  return (
    <CommonTableEmpty 
      columns={columns}
      message="No certificates found"
    />
  );
};