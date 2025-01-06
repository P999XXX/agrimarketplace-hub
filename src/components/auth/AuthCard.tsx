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
    <div className="min-h-screen bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 opacity-[0.08]">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          {/* Stilisiertes Weizenfeld */}
          <path d="M250,0 C250,0 400,150 400,250 C400,350 250,500 250,500 C250,500 100,350 100,250 C100,150 250,0 250,0 Z" fill="currentColor" className="text-brand-300" />
          <path d="M250,50 C250,50 375,175 375,250 C375,325 250,450 250,450 C250,450 125,325 125,250 C125,175 250,50 250,50 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 opacity-[0.08]">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          {/* Stilisiertes Blatt */}
          <path d="M100,0 C150,50 200,150 150,200 C100,150 50,100 0,150 C50,100 50,50 100,0 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 opacity-[0.08]">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          {/* Stilisierte Pflanze */}
          <path d="M150,0 C200,100 300,150 300,300 C150,250 100,200 0,300 C50,150 100,100 150,0 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>

      <div className="container mx-auto min-h-screen px-4 py-4 relative z-1">
        {/* Logo */}
        <Logo />
        
        {/* Main content */}
        <div className="min-h-[calc(100vh-theme(space.16))] flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center gap-16 lg:gap-8 pt-8 lg:pt-0">
          {/* Left side with static content */}
          <LeftContent />

          {/* Right side with form */}
          <div className="w-full lg:w-[45%] xl:w-[40%] relative z-2">
            <Card className="w-full bg-white shadow-xl border-0">
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-[1.6rem] md:text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                </div>
                
                <div className="max-h-[calc(100vh-theme(space.48))] overflow-y-auto">
                  <div className="px-2">
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