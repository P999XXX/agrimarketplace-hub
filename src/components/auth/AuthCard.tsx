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
    <div className="min-h-screen bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -top-20 -left-20 opacity-0 -rotate-12 animate-fade-in-down">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <path d="M200,0 C200,0 320,120 320,200 C320,280 200,400 200,400 C200,400 80,280 80,200 C80,120 200,0 200,0 Z" fill="currentColor" className="text-brand-300" />
          <path d="M200,40 C200,40 300,140 300,200 C300,260 200,360 200,360 C200,360 100,260 100,200 C100,140 200,40 200,40 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 opacity-0 animate-fade-in-left">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          <path d="M150,0 C200,100 300,150 300,300 C150,250 100,200 0,300 C50,150 100,100 150,0 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-1/3 opacity-0 -rotate-45 animate-fade-in-up">
        <svg width="250" height="250" viewBox="0 0 200 200" fill="none">
          <path d="M100,0 C150,50 200,150 150,200 C100,150 50,100 0,150 C50,100 50,50 100,0 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>

      <div className="container mx-auto min-h-screen px-6 py-4 relative z-1">
        {/* Logo */}
        <Logo />
        
        {/* Main content */}
        <div className="min-h-[calc(100vh-theme(space.16))] flex flex-col lg:flex-row items-start gap-16 lg:gap-8 pt-8 lg:pt-0">
          {/* Left side with static content - Hidden on mobile */}
          <div className="hidden lg:block lg:w-[45%] xl:w-[40%]">
            <LeftContent />
          </div>

          {/* Right side with form */}
          <div className="w-full lg:w-[45%] xl:w-[40%] relative z-2">
            <div className="lg:bg-white lg:shadow-xl lg:border-0 lg:rounded-lg">
              <div className="p-0 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-[1.6rem] md:text-3xl font-bold tracking-tight text-white lg:text-gray-900">{title}</h2>
                </div>
                
                <div className="max-h-[calc(100vh-theme(space.48))] overflow-y-auto">
                  <div className="px-0 lg:px-2">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
