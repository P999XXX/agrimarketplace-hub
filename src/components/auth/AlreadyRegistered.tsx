import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

export const AlreadyRegistered = () => {
  return (
    <div className="text-center mt-6">
      <Link 
        to="/signin" 
        className="inline-flex items-center text-white/90 md:text-gray-600 hover:text-primary transition-colors gap-2"
      >
        <LogIn className="w-4 h-4" />
        <span>Already registered? Sign in here</span>
      </Link>
    </div>
  );
};