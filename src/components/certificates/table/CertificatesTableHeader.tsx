import { CommonTableHeader } from "@/components/common/table/CommonTableHeader";

export const CertificatesTableHeader = () => {
  const columns = [
    { label: "Name" },
    { label: "Category" },
    { label: "Status" },
    { label: "Expiry Date" },
    { label: "Actions", className: "w-[100px]" }
  ];

  return <CommonTableHeader columns={columns} />;
};