import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { Logo } from "./Logo";
import { LeftContent } from "./LeftContent";

interface AuthCardProps {
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
}

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 relative overflow-hidden">
      <div className="container mx-auto px-4 pt-4">
        {/* Logo text aligned with content */}
        <div className="mb-[20px] md:mb-16 lg:mb-0">
          <Logo />
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-16">
          {/* Left side with static content */}
          <LeftContent />

          {/* Right side with form */}
          <div className="w-full lg:w-[45%]">
            <div className="lg:pl-12">
              <Card className="p-8 bg-white shadow-xl border-0">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                  </div>
                  {children}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 opacity-10">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="250" fill="currentColor" className="text-white" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 opacity-10">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <path d="M100 0L200 100L100 200L0 100L100 0Z" fill="currentColor" className="text-white" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 opacity-10">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          <rect width="300" height="300" rx="150" fill="currentColor" className="text-white" />
        </svg>
      </div>
    </div>
  );
};