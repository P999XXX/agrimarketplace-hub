import { FileText } from "lucide-react";
import { CommonCard } from "../card/CommonCard";

interface CommonEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export const CommonEmptyState = ({ 
  icon = <FileText className="h-8 w-8 text-muted-foreground" />,
  title,
  description 
}: CommonEmptyStateProps) => {
  return (
    <CommonCard
      header={
        <div className="flex flex-col items-center gap-2">
          {icon}
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      }
      content={<div />}
      footer={<div />}
    />
  );
};