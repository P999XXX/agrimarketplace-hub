import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-brand-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-8">
          <Button onClick={handleSignOut} variant="outline">
            Abmelden
          </Button>
        </div>
        <h1 className="text-4xl font-bold text-brand-900">Dashboard</h1>
        {/* Hier können weitere Dashboard-Komponenten hinzugefügt werden */}
      </div>
    </div>
  );
};

export default Dashboard;