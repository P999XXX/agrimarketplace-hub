import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateWithAI = async (prompt: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { prompt },
      });

      if (error) throw error;

      return data.generatedText;
    } catch (error: any) {
      console.error('AI Error:', error);
      toast({
        title: "Error",
        description: "Couldn't generate AI response. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateWithAI,
    isLoading,
  };
};