import { Logo } from "@/components/auth/Logo";
import { CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ThankYou() {
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

      <div className="container mx-auto px-4 pt-4 pb-8 relative z-10">
        <div className="mb-8">
          <Logo />
        </div>

        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
          <div className="text-center space-y-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-white">
              <CheckCircle className="w-10 h-10" />
              <h1 className="text-[1.6rem] md:text-4xl lg:text-5xl font-bold">Thank You!</h1>
            </div>
            
            <p className="text-white/90 text-xl">Your registration was successful</p>

            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mx-auto">
              <Mail className="w-10 h-10 text-secondary" />
            </div>

            <div className="space-y-4">
              <p className="text-white/80 text-lg">
                Please check your email to verify your account. The confirmation link has been sent to your inbox.
              </p>
              <p className="text-white/60">
                Don't forget to check your spam folder if you can't find the email.
              </p>
            </div>

            <div className="pt-4">
              <Button
                asChild
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <Link to="/" className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-secondary" />
                  Back to Homepage
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}