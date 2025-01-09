import { format } from "date-fns";
import { Download, MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Certificate } from "@/components/certificates/types";

interface CertificatesTableRowProps {
  certificate: Certificate;
}

export const CertificatesTableRow = ({ certificate }: CertificatesTableRowProps) => {
  return (
    <TableRow key={certificate.id}>
      <TableCell>
        <div className="font-medium">{certificate.name}</div>
        {certificate.description && (
          <div className="text-sm text-muted-foreground line-clamp-1">
            {certificate.description}
          </div>
        )}
      </TableCell>
      <TableCell>{certificate.category}</TableCell>
      <TableCell>
        <Badge 
          variant={certificate.status === "valid" ? "default" : "destructive"}
        >
          {certificate.status}
        </Badge>
      </TableCell>
      <TableCell>
        {format(new Date(certificate.expiry_date), "PP")}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};