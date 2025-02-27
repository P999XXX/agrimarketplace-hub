import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard } from "./AuthCard";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Temporäre Mock-Funktion für Entwicklung
    setTimeout(() => {
      setIsSuccess(true);
      toast({
        title: "Development Mode",
        description: "Password reset functionality is disabled during development",
      });
      setIsLoading(false);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <AuthCard
        title="Check your email"
        subtitle="We've sent you a password reset link. Please check your email."
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            If you don't see the email in your inbox, please check your spam folder.
          </p>
          <Link 
            to="/signin"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your email address and we'll send you a password reset link."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button 
          type="button" 
          className="w-full py-6"
          disabled={isLoading}
        >
          {isLoading ? "Sending reset link..." : "Send reset link"}
        </Button>

        <div className="text-center">
          <Link 
            to="/signin" 
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Back to sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};