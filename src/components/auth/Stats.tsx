import { UserCheck, Globe2, ShieldCheck } from "lucide-react";

export const Stats = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <UserCheck className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">100%</h6>
          <p className="text-white/70">Verified Suppliers</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <Globe2 className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">B2B</h6>
          <p className="text-white/70">Online Trading</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <ShieldCheck className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">100%</h6>
          <p className="text-white/70">Secure Trading</p>
        </div>
      </div>
    </div>
  );
};