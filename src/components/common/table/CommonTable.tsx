import { Table } from "@/components/ui/table";
import { ReactNode } from "react";

interface CommonTableProps {
  children: ReactNode;
  className?: string;
}

export const CommonTable = ({ children, className }: CommonTableProps) => {
  return (
    <div className={`rounded-md border ${className}`}>
      <Table>{children}</Table>
    </div>
  );
};