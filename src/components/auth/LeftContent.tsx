import { Stats } from "./Stats";

export const LeftContent = () => {
  return (
    <div className="hidden md:block w-full lg:w-1/2 lg:mb-0 mt-8">
      <div className="lg:pe-12 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-[700] mb-6">
          Connecting farmers
          <br />
          with <span className="text-secondary">buyers</span>
        </h1>
        <p className="text-lg text-white/70 mb-8 max-w-md">
          Built for agricultural businesses, cropio.app helps you connect with buyers and sellers of agricultural raw materials in a fraction of the time.
        </p>
      </div>
      <Stats />
    </div>
  );
};