import { AIChat } from "@/components/ai/AIChat";

export default function AIDevelopment() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-semibold text-center mb-8">Platform Development Assistant</h1>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Use our AI assistant to get suggestions and answers about the development of our B2B agricultural trading platform.
      </p>
      <AIChat />
    </div>
  );
}