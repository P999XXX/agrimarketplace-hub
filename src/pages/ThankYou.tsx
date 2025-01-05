import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <AuthCard
      title="Thank you for signing up!"
      subtitle="Please check your email to verify your account"
    >
      <div className="space-y-4">
        <p className="text-center text-muted-foreground">
          We've sent you an email with a verification link. Please click on it to complete your registration.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="w-full bg-brand-500 hover:bg-brand-600"
        >
          Back to Home
        </Button>
      </div>
    </AuthCard>
  );
};

export default ThankYou;