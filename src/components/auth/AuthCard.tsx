import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { Logo } from "./Logo";
import { LeftContent } from "./LeftContent";
import { SignInLeftContent } from "./SignInLeftContent";
import { useIsMobile } from "@/hooks/use-mobile";

interface AuthCardProps {
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
  variant?: 'signin' | 'signup';
}

export const AuthCard = ({ title, subtitle, children, variant = 'signup' }: AuthCardProps) => {
  const isMobile = useIsMobile();
  
  const displayTitle = variant === 'signin' ? (isMobile ? "Welcome back! Sign In" : "Sign In") : "Sign Up for Free!";

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 relative overflow-hidden animate-gradient-shift bg-[length:200%_200%]">
      {/* Background Shapes */}
      <div className="absolute -top-20 -left-20 opacity-0 -rotate-12 animate-fade-in-down">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          {/* Stilisiertes Weizenfeld */}
          <path d="M200,0 C200,0 320,120 320,200 C320,280 200,400 200,400 C200,400 80,280 80,200 C80,120 200,0 200,0 Z" fill="currentColor" className="text-brand-300" />
          <path d="M200,40 C200,40 300,140 300,200 C300,260 200,360 200,360 C200,360 100,260 100,200 C100,140 200,40 200,40 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 opacity-0 animate-fade-in-left">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          {/* Stilisierte Pflanze */}
          <path d="M150,0 C200,100 300,150 300,300 C150,250 100,200 0,300 C50,150 100,100 150,0 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-1/3 opacity-0 -rotate-45 animate-fade-in-up">
        <svg width="250" height="250" viewBox="0 0 200 200" fill="none">
          {/* Stilisiertes Blatt */}
          <path d="M100,0 C150,50 200,150 150,200 C100,150 50,100 0,150 C50,100 50,50 100,0 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>

      <div className="container mx-auto min-h-screen px-6 py-4 relative z-1 animate-fade">
        {/* Logo */}
        <Logo />
        
        {/* Main content */}
        <div className="min-h-[calc(100vh-theme(space.16))] flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center gap-16 lg:gap-8 pt-8 lg:pt-0">
          {/* Left side with static content */}
          {variant === 'signin' ? <SignInLeftContent /> : <LeftContent />}

          {/* Right side with form */}
          <div className="w-full lg:w-[45%] xl:w-[30%] relative z-2">
            <Card className="w-full bg-transparent md:bg-white shadow-none md:shadow-xl border-0">
              <div className="p-0 md:p-8">
                <div className="mb-6">
                  <h2 className="text-[1.6rem] md:text-3xl font-bold tracking-tight text-white md:text-gray-900">{displayTitle}</h2>
                </div>
                
                <div className="max-h-[calc(100vh-theme(space.48))]">
                  <div className="px-0 md:px-2">
                    {children}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};