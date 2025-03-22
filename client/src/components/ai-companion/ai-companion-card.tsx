import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function AICompanionCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold">AI Companion</h2>
        <Link href="/ai-companion">
          <Button variant="default" size="sm">
            Start Chat
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-4 p-3 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
        <div className="bg-primary rounded-full p-3 flex-shrink-0">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-medium mb-1">Talk to MindfulMe AI</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Your supportive AI companion is here to listen and provide guidance whenever you need someone to talk to.</p>
        </div>
      </div>
    </div>
  );
}
