import { AuthCard } from "@/components/auth/AuthCard";
import { CheckCircle, Mail } from "lucide-react";

export default function ThankYou() {
  return (
    <AuthCard
      title={
        <div className="flex items-center gap-2">
          <CheckCircle className="w-8 h-8 text-primary" />
          <span>Thank You!</span>
        </div>
      }
      subtitle="Your registration was successful"
    >
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Please check your email to verify your account. The confirmation link has been sent to your inbox.
          </p>
          <p className="text-sm text-gray-500">
            Don't forget to check your spam folder if you can't find the email.
          </p>
        </div>
      </div>
    </AuthCard>
  );
}