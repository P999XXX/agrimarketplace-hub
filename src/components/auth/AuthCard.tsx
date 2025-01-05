import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { DollarSign, Users, BadgeCheck } from "lucide-react";

interface AuthCardProps {
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
}

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      <div className="container py-16">
        {/* Logo text top left */}
        <div className="absolute top-8 left-8">
          <span className="text-[1.65rem]">
            <span className="text-white font-[700]">cropio</span>
            <span className="text-secondary font-[700]">.app</span>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-16">
          {/* Left side with static content */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="lg:pe-12 mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-[700] mb-6">
                Connecting farmers
                <br />
                with <span className="text-secondary">buyers</span>
              </h1>
              <p className="text-lg text-white/70 mb-8 max-w-md">
                Built for agricultural businesses, <span className="text-white font-[700]">cropio</span><span className="text-secondary font-[700]">.app</span> helps you connect with buyers and sellers of agricultural raw materials in a fraction of the time.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 text-white">
                  <DollarSign className="w-10 h-10" />
                </div>
                <div className="ml-4">
                  <h6 className="text-white text-xl font-bold mb-1">24/7</h6>
                  <p className="text-white/70">Market access</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 text-white">
                  <Users className="w-10 h-10" />
                </div>
                <div className="ml-4">
                  <h6 className="text-white text-xl font-bold mb-1">100+</h6>
                  <p className="text-white/70">Active traders</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 text-white">
                  <BadgeCheck className="w-10 h-10" />
                </div>
                <div className="ml-4">
                  <h6 className="text-white text-xl font-bold mb-1">100%</h6>
                  <p className="text-white/70">Verified traders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side with form */}
          <div className="w-full lg:w-1/2">
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

      {/* Background Illustrations */}
      <div className="absolute top-0 right-0 opacity-10">
        {/* Minimalistic Banana Leaf */}
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <path d="M250 100C250 100 400 200 400 350C400 400 350 450 300 450C250 450 200 400 200 350C200 300 250 250 300 250" 
                stroke="currentColor" 
                strokeWidth="20" 
                fill="none" 
                className="text-white" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 opacity-10">
        {/* Minimalistic Coffee Bean */}
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <path d="M100 50C140 50 160 90 160 120C160 150 140 170 100 170C60 170 40 150 40 120C40 90 60 50 100 50Z" 
                stroke="currentColor" 
                strokeWidth="10" 
                fill="none" 
                className="text-white" />
          <path d="M100 70C120 70 140 90 140 120" 
                stroke="currentColor" 
                strokeWidth="10" 
                fill="none" 
                className="text-white" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 opacity-10">
        {/* Minimalistic Nut */}
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          <path d="M150 100C200 100 230 130 230 180C230 230 200 260 150 260C100 260 70 230 70 180C70 130 100 100 150 100Z" 
                stroke="currentColor" 
                strokeWidth="15" 
                fill="none" 
                className="text-white" />
          <path d="M150 140L150 220M120 160L180 200M180 160L120 200" 
                stroke="currentColor" 
                strokeWidth="15" 
                fill="none" 
                className="text-white" />
        </svg>
      </div>
    </div>
  );
};
