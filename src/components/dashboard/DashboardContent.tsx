import { cn } from "@/lib/utils";

interface DashboardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardContent = ({ children, className }: DashboardContentProps) => {
  return (
    <div className={cn("container py-8 space-y-6", className)}>
      {children}
    </div>
  );
};