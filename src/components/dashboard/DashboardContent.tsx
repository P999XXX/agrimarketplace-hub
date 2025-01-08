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
    <div className={cn("relative flex flex-col h-[calc(100vh-4rem)] bg-background", className)}>
      {children}
    </div>
  );
};