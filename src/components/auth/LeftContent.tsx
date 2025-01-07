import { Stats } from "./Stats";
import { useState, useEffect } from "react";

export const LeftContent = () => {
  const words = ["buyers", "importers", "manufacturers", "bakeries", "retail"];
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
          Connecting farmers
          <br />
          & exporters
          <br />
          with{" "}
          <span key={currentWordIndex} className="text-secondary inline-block animate-fade">
            {words[currentWordIndex]}
          </span>
        </h1>
        <p className="text-lg text-white/70 mb-8 max-w-md">
          Built for agricultural businesses, cropio.app helps you connect with buyers and sellers of agricultural raw materials in a fraction of the time.
        </p>
      </div>
      <Stats />
    </div>
  );
};