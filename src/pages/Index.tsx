import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-brand-50 to-brand-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Willkommen bei Cropio
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Der B2B Marktplatz für Agrarhandel und Lebensmittelrohstoffe
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/signup">Registrieren</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;