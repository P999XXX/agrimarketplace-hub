import { Stats } from "./Stats";

export const LeftContent = () => {
  return (
    <div className="hidden md:block md:p-[15px] lg:p-0 w-full lg:w-1/2 lg:mb-0">
      <div className="lg:pe-12 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-[700] mb-6">
          Welcome back to
          <br />
          your agri business
          <br />
          platform cropio
          <span className="text-secondary">.app</span>
        </h1>
        <p className="text-lg text-white/70 mb-8 max-w-[528px]">
          Join the leading B2B marketplace for agricultural raw materials. Connect with verified partners, access real-time market data, and trade with confidence on our AI-powered platform.
        </p>
      </div>
      <Stats />
    </div>
  );
};