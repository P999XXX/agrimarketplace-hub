import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side with image and text */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="/lovable-uploads/1bcd0dca-35f6-48ac-9ec8-503b45ac1fe7.png"
          alt="Green leaves background"
          className="object-cover w-full"
        />
        <div className="absolute inset-0 bg-black/10" /> {/* Subtle overlay */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
          <h1 className="text-white text-[8rem] font-bold leading-none tracking-tighter">
            SIGN
            <br />
            UP
          </h1>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#f8f8f8]">
        <Card className="w-full max-w-md p-8 bg-white/95 shadow-sm border-0">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-medium tracking-tight text-gray-900">{title}</h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};