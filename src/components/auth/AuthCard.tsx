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
      {/* Left side with static content */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-500 relative">
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-6">
            Connecting farmers
            <br />
            with <span className="text-brand-200">buyers</span>
          </h1>
          <p className="text-lg text-brand-100 mb-8 max-w-md">
            Built for agricultural businesses, CROPIO helps you connect with buyers and sellers of agricultural raw materials in a fraction of the time.
          </p>
          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-bold text-brand-200">24/7</div>
              <div className="text-brand-100">Market access</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-200">100+</div>
              <div className="text-brand-100">Active traders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#f8f8f8]">
        <Card className="w-full max-w-md p-8 bg-white shadow-sm border-0">
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