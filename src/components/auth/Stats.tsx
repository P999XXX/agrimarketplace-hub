import { UserCheck, Globe2, ShieldCheck } from "lucide-react";

export const Stats = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <UserCheck className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">10,000+</h6>
          <p className="text-white/70">Active Traders</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <Globe2 className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">24/7</h6>
          <p className="text-white/70">Global Trading</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <ShieldCheck className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">€2M+</h6>
          <p className="text-white/70">Daily Volume</p>
        </div>
      </div>
    </div>
  );
};