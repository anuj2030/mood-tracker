import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from "@/components/ai-companion/chat-interface";

export default function AICompanion() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">AI Companion</h1>
        <p className="text-slate-500 dark:text-slate-400">Your supportive companion is here to listen and help</p>
      </div>
      
      <Card className="h-[calc(100vh-14rem)]">
        <CardHeader>
          <CardTitle>MindfulMe AI</CardTitle>
          <CardDescription>
            Chat with your AI companion about how you're feeling or any concerns you might have.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)]">
          <ChatInterface />
        </CardContent>
      </Card>
    </>
  );
}
