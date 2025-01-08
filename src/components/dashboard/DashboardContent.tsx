import { cn } from "@/lib/utils";

interface DashboardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardContent = ({ children, className }: DashboardContentProps) => {
  return (
    <div className={cn("container py-8 space-y-6 md:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};