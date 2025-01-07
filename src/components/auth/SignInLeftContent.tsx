import { Stats } from "./Stats";

export const SignInLeftContent = () => {
  return (
    <div className="hidden md:block md:p-[15px] lg:p-0 w-full lg:w-1/2 lg:mb-0">
      <div className="lg:pe-12 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-[700] mb-6">
          Welcome back to your
          <br />
          <span className="text-white">agricultural</span><span className="text-secondary"> trading platform</span>
        </h1>
        <p className="text-lg text-white/70 mb-8 max-w-[528px]">
          Sign in to access your account and continue trading. Don't have an account yet? Join our growing community of agricultural businesses and start trading smarter today.
        </p>
      </div>
      <Stats />
    </div>
  );
};