import { useEffect, useState } from "react";
import { Stats } from "./Stats";

const rotatingWords = [
  "farmers",
  "exporters",
  "packagers",
];

export const LeftContent = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:block md:p-[15px] lg:p-0 w-full lg:w-1/2 lg:mb-0">
      <div className="lg:pe-12 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-[700] mb-6">
          Connecting
          <br />
          <span className="text-secondary min-h-[84px] block">
            {rotatingWords[currentWordIndex]}
          </span>
        </h1>
        <p className="text-lg text-white/70 mb-8 max-w-[528px]">
          Empowering agricultural businesses with AI-driven trading, cropio.app connects buyers and sellers of agricultural raw materials faster and smarter than ever before.
        </p>
      </div>
      <Stats />
    </div>
  );
};