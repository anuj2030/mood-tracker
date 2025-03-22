import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Mood } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";
import MoodStressChart from "@/components/charts/mood-stress-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, moodEmojis, moodColors } from "@/lib/utils";
import { Link } from "wouter";

export default function MoodTracker() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("week");
  
  const { data: moods = [], isLoading } = useQuery<Mood[]>({
    queryKey: ["/api/moods"],
    enabled: !!user
  });
  
  // Helper to filter moods by period
  const filterMoodsByPeriod = (period: "week" | "month" | "year") => {
    const now = new Date();
    let cutoff = new Date();
    
    if (period === "week") {
      cutoff.setDate(now.getDate() - 7);
    } else if (period === "month") {
      cutoff.setMonth(now.getMonth() - 1);
    } else {
      cutoff.setFullYear(now.getFullYear() - 1);
    }
    
    return moods.filter(mood => new Date(mood.timestamp) >= cutoff);
  };
  
  const filteredMoods = filterMoodsByPeriod(selectedPeriod);
  
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Mood Tracker</h1>
          <p className="text-slate-500 dark:text-slate-400">Track and visualize your emotional wellbeing</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link href="/mood-tracker/new">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Track New Mood
            </Button>
          </Link>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <MoodStressChart data={moods} className="mb-6" />
          
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Mood History</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredMoods.length > 0 ? (
                  <div className="space-y-4">
                    {filteredMoods.map((mood) => (
                      <div 
                        key={mood.id}
                        className="p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">
                              {moodEmojis[mood.mood as keyof typeof moodEmojis] || "😐"}
                            </span>
                            <span className="font-medium">{mood.mood}</span>
                          </div>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {formatDate(mood.timestamp)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Stress Level</p>
                            <p className="font-medium">{mood.stress || "Not tracked"}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Sleep Duration</p>
                            <p className="font-medium">{mood.sleepDuration || "Not tracked"}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Sleep Quality</p>
                            <p className="font-medium">{mood.sleep || "Not tracked"}</p>
                          </div>
                        </div>
                        
                        {mood.notes && (
                          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Notes</p>
                            <p className="text-sm mt-1">{mood.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <p>No mood data available for this time period</p>
                    <p className="mt-2">
                      <Link href="/mood-tracker/new">
                        <Button variant="outline" size="sm">Track your first mood</Button>
                      </Link>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
