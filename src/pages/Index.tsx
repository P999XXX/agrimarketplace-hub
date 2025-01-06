import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/auth/Logo";
import { ShieldCheck, Lock, LineChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -top-20 -left-20 opacity-[0.08] -rotate-12">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          {/* Stilisiertes Weizenfeld */}
          <path d="M200,0 C200,0 320,120 320,200 C320,280 200,400 200,400 C200,400 80,280 80,200 C80,120 200,0 200,0 Z" fill="currentColor" className="text-brand-300" />
          <path d="M200,40 C200,40 300,140 300,200 C300,260 200,360 200,360 C200,360 100,260 100,200 C100,140 200,40 200,40 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 opacity-[0.08]">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          {/* Stilisierte Pflanze */}
          <path d="M150,0 C200,100 300,150 300,300 C150,250 100,200 0,300 C50,150 100,100 150,0 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-1/3 opacity-[0.08] -rotate-45">
        <svg width="250" height="250" viewBox="0 0 200 200" fill="none">
          {/* Stilisiertes Blatt */}
          <path d="M100,0 C150,50 200,150 150,200 C100,150 50,100 0,150 C50,100 50,50 100,0 Z" fill="currentColor" className="text-brand-300" />
        </svg>
      </div>

      <div className="container mx-auto min-h-screen px-6 py-4 relative z-1">
        {/* Logo */}
        <Logo />
        
        {/* Main content */}
        <div className="min-h-[calc(100vh-theme(space.16))] flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center gap-16 lg:gap-8 pt-8 lg:pt-0">
          {/* Left side with hero content */}
          <div className="w-full lg:w-1/2 lg:pe-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-[700] mb-6">
              Transform your 
              <br />
              agricultural <span className="text-secondary">trade</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-xl">
              cropio.app is your trusted B2B marketplace for agricultural commodities. Connect with verified buyers and sellers, streamline your trading process, and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-primary">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right side with key features */}
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

// Feature Card Component
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
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
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