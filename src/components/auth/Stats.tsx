import { DollarSign, Users, BadgeCheck } from "lucide-react";

export const Stats = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <DollarSign className="w-10 h-10" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">24/7</h6>
          <p className="text-white/70">Market access</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <Users className="w-10 h-10" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">100+</h6>
          <p className="text-white/70">Active traders</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <BadgeCheck className="w-10 h-10" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">100%</h6>
          <p className="text-white/70">Verified traders</p>
        </div>
      </div>
    </div>
  );
};