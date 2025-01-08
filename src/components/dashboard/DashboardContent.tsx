import { cn } from "@/lib/utils";

interface DashboardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardContent = ({ children, className }: DashboardContentProps) => {
  return (
    <div className={cn("h-[calc(100vh-4rem)] overflow-hidden", className)}>
      {children}
    </div>
  );
};