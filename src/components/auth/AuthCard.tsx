import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-brand-50 to-brand-100">
      <Card className="w-full max-w-md p-8 backdrop-blur-sm bg-white/95 shadow-lg animate-fadeIn">
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-medium tracking-tight text-gray-900">{title}</h1>
            <p className="text-sm text-muted-foreground font-light">{subtitle}</p>
          </div>
          {children}
        </div>
      </Card>
    </div>
  );
};