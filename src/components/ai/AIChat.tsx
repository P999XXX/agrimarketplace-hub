import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useAI } from "@/hooks/useAI";
import { Loader2 } from "lucide-react";

export const AIChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const { generateWithAI, isLoading } = useAI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const result = await generateWithAI(prompt);
    if (result) {
      setResponse(result);
    }
    setPrompt("");
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium text-gray-700">
            Frage zur B2B-Plattform
          </label>
          <Textarea
            id="prompt"
            placeholder="z.B.: Welche Features wären für Agrarhändler besonders wichtig?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading || !prompt.trim()} 
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generiere Antwort...
            </>
          ) : (
            "Frage senden"
          )}
        </Button>

        {response && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Antwort:</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </form>
    </Card>
  );
};