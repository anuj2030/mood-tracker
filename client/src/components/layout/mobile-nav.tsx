import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Home, Smile, PenSquare, MessageSquare } from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();
  
  const navItems = [
    { 
      href: "/", 
      label: "Home", 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      href: "/mood-tracker", 
      label: "Mood", 
      icon: <Smile className="w-5 h-5" /> 
    },
    { 
      href: "/journal", 
      label: "Journal", 
      icon: <PenSquare className="w-5 h-5" /> 
    },
    { 
      href: "/ai-companion", 
      label: "AI Chat", 
      icon: <MessageSquare className="w-5 h-5" /> 
    },
  ];
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around p-3">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <a className="flex flex-col items-center">
            <div className={cn(
              location === item.href ? "text-primary" : "text-slate-500 dark:text-slate-400"
            )}>
              {item.icon}
            </div>
            <span className={cn(
              "text-xs mt-1",
              location === item.href ? "text-primary" : "text-slate-500 dark:text-slate-400"
            )}>
              {item.label}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
}
