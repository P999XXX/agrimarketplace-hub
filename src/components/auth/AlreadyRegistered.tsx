import { Link } from "react-router-dom";

export const AlreadyRegistered = () => {
  return (
    <div className="text-center mt-6">
      <p className="text-white/70 md:text-gray-500">
        Already have an account?{" "}
        <Link to="/" className="text-white md:text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
};