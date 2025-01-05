import { Card } from "@/components/ui/card";
import { ReactNode, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const generateImage = async () => {
      try {
        setIsLoading(true);
        console.log('Calling generate-signup-image function...');
        const { data, error } = await supabase.functions.invoke('generate-signup-image', {
          method: 'POST',
          body: {}
        });
        
        if (error) {
          console.error('Function error:', error);
          throw error;
        }
        
        if (!data?.image) {
          throw new Error('No image data received');
        }
        
        console.log('Image received successfully');
        setBackgroundImage(data.image);
      } catch (error: any) {
        console.error('Failed to generate background image:', error);
        
        // Check if we should retry due to rate limiting
        if (error.message?.includes('Max requests') && retryCount < 3) {
          const retryDelay = (retryCount + 1) * 10000; // Increase delay with each retry
          toast({
            title: "Generating image",
            description: `Please wait ${retryDelay/1000} seconds for retry...`,
          });
          
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, retryDelay);
          
          return;
        }
        
        toast({
          title: "Error",
          description: "Failed to generate background image. Using fallback.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateImage();
  }, [retryCount, toast]);

  return (
    <div className="min-h-screen flex">
      {/* Left side with generated image and text */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {isLoading ? (
          <div className="w-full bg-gradient-to-br from-brand-400 to-brand-600 animate-pulse" />
        ) : backgroundImage ? (
          <img
            src={backgroundImage}
            alt="Nature background"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full bg-gradient-to-br from-brand-400 to-brand-600" />
        )}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
          <h1 className="text-white text-[8rem] font-bold leading-none tracking-tighter">
            SIGN
            <br />
            UP
          </h1>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#f8f8f8]">
        <Card className="w-full max-w-md p-8 bg-white/95 shadow-sm border-0">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-medium tracking-tight text-gray-900">{title}</h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};