import { Stats } from "./Stats";

export const LeftContent = () => {
  return (
    <div className="hidden lg:block w-full lg:w-1/2 lg:mb-0">
      <div className="lg:pe-12 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-[700] mb-6">
          Connecting farmers
          <br />
          with <span className="text-secondary">buyers</span>
        </h1>
        <p className="text-lg text-white/70 mb-8 max-w-md">
          Built for agricultural businesses, <span className="text-white font-[700]">cropio</span><span className="text-secondary font-[700]">.app</span> helps you connect with buyers and sellers of agricultural raw materials in a fraction of the time.
        </p>
      </div>
      <Stats />
    </div>
  );
};