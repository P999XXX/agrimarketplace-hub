import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useWaitTime = () => {
  const { toast } = useToast();
  const [waitTime, setWaitTime] = useState<number | null>(null);

  useEffect(() => {
    if (waitTime !== null && waitTime > 0) {
      const timer = setTimeout(() => {
        setWaitTime(waitTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (waitTime === 0) {
      setWaitTime(null);
    }
  }, [waitTime]);

  useEffect(() => {
    if (waitTime !== null) {
      toast({
        title: "Bitte warten",
        description: `Noch ${waitTime} Sekunden bis zum nächsten Versuch...`,
        variant: "destructive",
      });
    }
  }, [waitTime, toast]);

  return {
    waitTime,
    setWaitTime,
  };
};