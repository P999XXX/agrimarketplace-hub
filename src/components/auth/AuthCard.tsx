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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-blue-50 to-blue-100 relative">
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          <h1 className="text-5xl font-semibold text-gray-800 mb-6">
            Connecting farmers
            <br />
            with <span className="text-brand-500">buyers</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            Built for agricultural businesses, CROPIO helps you connect with buyers and sellers of agricultural raw materials in a fraction of the time.
          </p>
          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-semibold text-brand-500">24/7</div>
              <div className="text-gray-600">Market access</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-brand-500">100+</div>
              <div className="text-gray-600">Active traders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <Card className="w-full max-w-md p-8 bg-white shadow-sm border-0">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};