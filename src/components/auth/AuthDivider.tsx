export const AuthDivider = () => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[#f8f8f8] px-2 text-gray-500">
          Or continue with
        </span>
      </div>
    </div>
  );
};