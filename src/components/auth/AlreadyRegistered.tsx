import { Link } from "react-router-dom";

export const AlreadyRegistered = () => {
  return (
    <div className="text-center mt-6">
      <Link 
        to="/signin" 
        className="text-white/90 md:text-gray-600"
      >
        <span>Already registered? </span>
        <span className="hover:text-primary transition-colors">Sign in here</span>
      </Link>
    </div>
  );
};