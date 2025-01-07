import { Stats } from "./Stats";
import { useState, useEffect } from "react";

export const LeftContent = () => {
  const words = ["buyers", "importers", "manufacturers", "bakeries", "retail", "confectioneries", "wholesalers", "distributors", "online shops", "packagers"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:block md:p-[15px] lg:p-0 w-full lg:w-1/2 lg:mb-0">
      <div className="lg:pe-12 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-[700] mb-6">
          Welcome back to
          <br />
          your agri business
          <br />
          platform cropio.app
          <br />
          <span key={currentWordIndex} className="text-secondary inline-block animate-fade">
            {words[currentWordIndex]}
          </span>
        </h1>
        <p className="text-lg text-white/70 mb-8 max-w-[528px]">
          Join the leading B2B marketplace for agricultural raw materials. Connect with verified partners, access real-time market data, and trade with confidence on our AI-powered platform.
        </p>
      </div>
      <Stats />
    </div>
  );
};