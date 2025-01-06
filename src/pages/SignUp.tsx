import { SignUpForm } from "@/components/auth/SignUpForm";
import { AIChat } from "@/components/ai/AIChat";

export default function SignUp() {
  return (
    <div className="min-h-screen">
      <SignUpForm />
      <div className="py-8">
        <AIChat />
      </div>
    </div>
  );
}