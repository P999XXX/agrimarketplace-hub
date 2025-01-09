import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, MoreHorizontal, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useCertificatesQuery } from "@/hooks/certificates/useCertificatesQuery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CertificatesTable = ({
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
  const { data: certificates, isLoading } = useCertificatesQuery();

  const filteredCertificates = certificates?.filter((cert) => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || cert.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || cert.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell colSpan={5}>
                  <div className="animate-pulse flex items-center space-x-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!filteredCertificates?.length) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No certificates found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCertificates.map((certificate) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};