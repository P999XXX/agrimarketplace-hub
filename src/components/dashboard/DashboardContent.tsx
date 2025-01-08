import { cn } from "@/lib/utils";

interface DashboardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardContent = ({
  children,
  className,
}: DashboardContentProps) => {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
};