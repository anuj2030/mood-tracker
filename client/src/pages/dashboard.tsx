import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Mood, Journal } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Loader2, Smile, Zap, Moon } from "lucide-react";
import StatCard from "@/components/stats/stat-card";
import MoodStressChart from "@/components/charts/mood-stress-chart";
import JournalCard from "@/components/journal/journal-card";
import TherapyToolsCard from "@/components/therapy/therapy-tools-card";
import AICompanionCard from "@/components/ai-companion/ai-companion-card";
import { formatDate } from "@/lib/utils";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  
  const { data: moods = [], isLoading: moodsLoading } = useQuery<Mood[]>({
    queryKey: ["/api/moods"],
    enabled: !!user
  });
  
  const { data: journals = [], isLoading: journalsLoading } = useQuery<Journal[]>({
    queryKey: ["/api/journals"],
    enabled: !!user
  });
  
  // Get the most recent mood entry if it exists
  const latestMood = moods.length > 0 ? moods[0] : null;
  
  // Get the date for the header
  const today = new Date();
  const formattedDate = formatDate(today);
  
  return (
    <>
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back, {user?.name || user?.username}</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1 text-sm flex items-center">
            <span className="mr-2 text-slate-500 dark:text-slate-400">Today</span>
            <span className="font-medium">{formattedDate}</span>
          </div>
          
          <Link href="/mood-tracker/new">
            <Button size="sm">Track Mood</Button>
          </Link>
        </div>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {moodsLoading ? (
          <div className="col-span-3 flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <StatCard
              title="Current Mood"
              value={latestMood?.mood || "Not tracked"}
              subtitle={latestMood ? "Last tracked 2 hours ago" : "No data available"}
              icon={<Smile className="w-6 h-6 text-yellow-500" />}
              iconColor="text-yellow-500"
              iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
              timeframe="Today"
            />
            
            <StatCard
              title="Stress Level"
              value={latestMood?.stress || "Not tracked"}
              subtitle={latestMood?.stress === "Low" ? "Lower than yesterday" : "No comparison data"}
              icon={<Zap className="w-6 h-6 text-blue-500" />}
              iconColor="text-blue-500"
              iconBgColor="bg-blue-100 dark:bg-blue-900/30"
              timeframe="Today"
            />
            
            <StatCard
              title="Sleep Quality"
              value={latestMood?.sleepDuration || "Not tracked"}
              subtitle={latestMood?.sleep || "No data available"}
              icon={<Moon className="w-6 h-6 text-indigo-500" />}
              iconColor="text-indigo-500"
              iconBgColor="bg-indigo-100 dark:bg-indigo-900/30"
              timeframe="Last Night"
            />
          </>
        )}
      </div>
      
      {/* Mood chart */}
      <MoodStressChart data={moods} className="mb-6" />
      
      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <JournalCard 
          entries={journals}
          className={journalsLoading ? "opacity-50 pointer-events-none" : ""}
        />
        
        <TherapyToolsCard />
      </div>
      
      {/* AI Companion */}
      <AICompanionCard />
    </>
  );
}
