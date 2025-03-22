import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import ThemeToggle from "./theme-toggle";
import {
  Home,
  Smile,
  PenSquare,
  Clock,
  MessageSquare,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  const navItems = [
    { 
      href: "/", 
      label: "Dashboard", 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      href: "/mood-tracker", 
      label: "Mood Tracker", 
      icon: <Smile className="w-5 h-5" /> 
    },
    { 
      href: "/journal", 
      label: "Journal", 
      icon: <PenSquare className="w-5 h-5" /> 
    },
    { 
      href: "/therapy-tools", 
      label: "Therapy Tools", 
      icon: <Clock className="w-5 h-5" /> 
    },
    { 
      href: "/ai-companion", 
      label: "AI Companion", 
      icon: <MessageSquare className="w-5 h-5" /> 
    },
    { 
      href: "/settings", 
      label: "Settings", 
      icon: <Settings className="w-5 h-5" /> 
    },
  ];
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-700 hidden md:block">
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h1 className="text-xl font-heading font-semibold">MindfulMe</h1>
        </div>
        
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "flex items-center gap-2 p-2 rounded-md",
                location === item.href 
                  ? "bg-primary bg-opacity-10 text-primary" 
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )}>
                {item.icon}
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto border-t border-slate-200 dark:border-slate-700 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">Dark mode</span>
            <ThemeToggle />
          </div>
          
          <div className="flex items-center mt-4 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2">
              {user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || user?.username}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email || "No email set"}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="mt-2 w-full text-left p-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
