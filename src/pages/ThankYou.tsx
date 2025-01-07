import { Logo } from "@/components/auth/Logo";
import { CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 relative overflow-hidden animate-gradient-shift bg-[length:200%_200%]">
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

      <div className="container mx-auto min-h-screen px-6 py-4 relative z-1 animate-fade">
        {/* Logo */}
        <Logo />
        
        {/* Main content */}
        <div className="min-h-[calc(100vh-theme(space.16))] flex items-center justify-center pt-8 lg:pt-0">
          {/* Card */}
          <div className="w-full max-w-md relative z-2">
            <Card className="w-full bg-transparent md:bg-white shadow-none md:shadow-xl border-0">
              <div className="p-0 md:p-8">
                <div className="space-y-8 text-center">
                  <div className="flex items-center justify-center gap-3 text-white md:text-gray-900">
                    <CheckCircle className="w-10 h-10" />
                    <h2 className="text-[1.6rem] md:text-3xl font-bold">Thank You!</h2>
                  </div>
                  
                  <p className="text-white/90 md:text-gray-600 text-lg">
                    Your registration was successful
                  </p>

                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 md:bg-brand-50 mx-auto">
                    <Mail className="w-10 h-10 text-secondary" />
                  </div>

                  <div className="space-y-4">
                    <p className="text-white/80 md:text-gray-600 text-lg">
                      Please check your email to verify your account.
                    </p>
                    <p className="text-white/60 md:text-gray-500 text-sm">
                      Don't forget to check your spam folder if you can't find the email.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full bg-white/10 hover:bg-white/20 md:bg-white md:hover:bg-gray-50 text-white md:text-gray-900 border-white/20 md:border-gray-200"
                    >
                      <Link to="/" className="flex items-center justify-center gap-2">
                        Back to Homepage
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}