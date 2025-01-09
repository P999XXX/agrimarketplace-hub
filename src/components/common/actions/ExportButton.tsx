import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportButtonProps {
  onExport: () => void;
}

export const ExportButton = ({ onExport }: ExportButtonProps) => {
  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={onExport} 
      className="h-10 w-10 shadow-sm"
    >
      <Download className="h-4 w-4" />
    </Button>
  );
};