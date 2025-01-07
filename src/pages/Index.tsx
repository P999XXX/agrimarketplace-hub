import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/auth/Logo";
import { ShieldCheck, Lock, LineChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 relative overflow-hidden animate-gradient-shift bg-[length:200%_200%]">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
          alt="Background" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="container mx-auto min-h-screen px-6 py-4 relative z-1">
        <Logo />
        
        <div className="min-h-[calc(100vh-theme(space.16))] flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center gap-16 lg:gap-8 pt-8 lg:pt-0">
          <div className="w-full lg:w-1/2 md:pl-[15px] lg:pl-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-[700] mb-6 animate-fade">
              Transform your 
              <br />
              agricultural <span className="text-secondary">trade</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-xl animate-fade">
              cropio.app is your trusted B2B marketplace for agricultural commodities. Connect with verified buyers and sellers, streamline your trading process, and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white py-6">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 py-6">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="grid gap-6">
              <FeatureCard 
                title="Verified Partners"
                description="Connect with pre-vetted buyers and sellers in the agricultural sector."
                icon={<ShieldCheck className="w-6 h-6" />}
              />
              <FeatureCard 
                title="Secure Trading"
                description="Trade with confidence using our secure platform and payment system."
                icon={<Lock className="w-6 h-6" />}
              />
              <FeatureCard 
                title="Market Insights"
                description="Access real-time market data and trends to make informed decisions."
                icon={<LineChart className="w-6 h-6" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 animate-fade">
      <div className="flex gap-4 items-start">
        <div className="text-secondary">
          {icon}
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
          <p className="text-white/70">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;