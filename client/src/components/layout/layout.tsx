import { ReactNode } from "react";
import { useLocation } from "wouter";
import Sidebar from "./sidebar";
import MobileNav from "./mobile-nav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  // Check if current location is the auth page
  if (location === "/auth") {
    return <>{children}</>;
  }
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (hidden on mobile) */}
      <Sidebar />
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
        {/* Mobile header (shown only on mobile) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-heading font-semibold">MindfulMe</h1>
          </div>
        </header>
        
        {/* Page content */}
        <div className="p-4 md:p-6 max-w-6xl mx-auto pb-20 md:pb-6">
          {children}
        </div>
        
        {/* Mobile navigation */}
        <MobileNav />
      </main>
    </div>
  );
}
