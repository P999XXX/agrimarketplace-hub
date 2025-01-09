import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

interface Column {
  label: string;
  className?: string;
}

interface CommonTableHeaderProps {
  columns: Column[];
  children?: ReactNode;
}

export const CommonTableHeader = ({ columns, children }: CommonTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((column, index) => (
          <TableHead key={index} className={column.className}>
            {column.label}
          </TableHead>
        ))}
        {children}
      </TableRow>
    </TableHeader>
  );
};