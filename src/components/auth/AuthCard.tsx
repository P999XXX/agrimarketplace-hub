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
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 opacity-10 -z-0">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="250" fill="currentColor" className="text-white" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 opacity-10 -z-0">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <path d="M100 0L200 100L100 200L0 100L100 0Z" fill="currentColor" className="text-white" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 opacity-10 -z-0">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          <rect width="300" height="300" rx="150" fill="currentColor" className="text-white" />
        </svg>
      </div>

      <div className="container mx-auto min-h-screen px-4 py-4">
        {/* Logo */}
        <Logo />
        
        {/* Main content */}
        <div className="min-h-[calc(100vh-theme(space.16))] flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-8">
          {/* Left side with static content */}
          <LeftContent />

          {/* Right side with form */}
          <div className="w-full lg:w-[45%] xl:w-[40%]">
            <Card className="w-full bg-white shadow-xl border-0">
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-[1.6rem] md:text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                </div>
                
                <div className="max-h-[calc(100vh-theme(space.48))] overflow-y-auto">
                  {children}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};