import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

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
          <span className="text-[1.3125rem]">
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

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 text-white">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h6 className="text-white text-xl font-bold mb-1">24/7</h6>
                  <p className="text-white/70">Market access</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 text-white">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h6 className="text-white text-xl font-bold mb-1">100+</h6>
                  <p className="text-white/70">Active traders</p>
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