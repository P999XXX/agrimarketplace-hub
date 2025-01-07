import { Globe, ShieldCheck, Leaf } from "lucide-react";

export const Stats = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <Globe className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">Digital</h6>
          <p className="text-white/70">AI Trade Platform</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <ShieldCheck className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">Secure</h6>
          <p className="text-white/70">B2B Trading</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 text-white">
          <Leaf className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="ml-4">
          <h6 className="text-white text-xl font-bold mb-1">Sustainable &</h6>
          <p className="text-white/70">Organic Products</p>
        </div>
      </div>
    </div>
  );
};