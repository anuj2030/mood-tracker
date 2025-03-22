import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { InsertChat, Chat } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { cn, formatTime } from "@/lib/utils";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  const { data: chatHistory = [], isLoading } = useQuery<Chat[]>({
    queryKey: ["/api/chats"],
    enabled: !!user
  });
  
  const sendMessageMutation = useMutation({
    mutationFn: async (newMessage: InsertChat) => {
      const res = await apiRequest("POST", "/api/chats", newMessage);
      return await res.json();
    },
    onSuccess: (newMessages) => {
      queryClient.invalidateQueries({ queryKey: ["/api/chats"] });
    },
  });
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    sendMessageMutation.mutate({
      message: message.trim(),
      isUserMessage: true
    });
    
    setMessage("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loading-spinner"></div>
          </div>
        ) : chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageSquareIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="font-medium text-lg mb-2">Welcome to MindfulMe AI</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              I'm here to listen and support you. Feel free to share how you're feeling or ask for guidance.
            </p>
          </div>
        ) : (
          chatHistory.map((chat) => (
            <ChatMessage
              key={chat.id}
              message={chat.message}
              isUser={chat.isUserMessage}
              timestamp={chat.timestamp}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-end gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[80px] resize-none"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!message.trim() || sendMessageMutation.isPending}
            className="mb-1"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date | string;
}

function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2 flex flex-col",
        isUser 
          ? "bg-primary text-white rounded-br-none" 
          : "bg-slate-100 dark:bg-slate-700 rounded-bl-none"
      )}>
        <p className="break-words whitespace-pre-wrap">{message}</p>
        <span className={cn(
          "text-xs mt-1",
          isUser ? "text-primary-foreground/70" : "text-slate-500 dark:text-slate-400"
        )}>
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
