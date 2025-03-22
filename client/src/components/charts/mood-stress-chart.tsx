import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Mood } from "@shared/schema";
import { formatDate } from "@/lib/utils";

interface MoodStressChartProps {
  data: Mood[];
  className?: string;
}

// Map mood string values to numerical values for chart
const moodToValue = {
  "Great": 5,
  "Good": 4,
  "Okay": 3,
  "Bad": 2,
  "Terrible": 1
};

// Map stress string values to numerical values for chart
const stressToValue = {
  "Low": 1,
  "Medium": 2,
  "High": 3
};

// Convert mood data to chart data format
const formatChartData = (moods: Mood[]) => {
  return moods.map(mood => ({
    date: formatDate(mood.timestamp),
    mood: moodToValue[mood.mood as keyof typeof moodToValue] || 3,
    stress: stressToValue[mood.stress as keyof typeof stressToValue] || 2,
    rawDate: new Date(mood.timestamp)
  }));
};

export default function MoodStressChart({ data, className }: MoodStressChartProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  
  // Filter data based on selected time range
  const filterDataByTimeRange = () => {
    const now = new Date();
    let cutoff = new Date();
    
    if (timeRange === "week") {
      cutoff.setDate(now.getDate() - 7);
    } else if (timeRange === "month") {
      cutoff.setMonth(now.getMonth() - 1);
    } else {
      cutoff.setFullYear(now.getFullYear() - 1);
    }
    
    return formatChartData(
      data
        .filter(item => new Date(item.timestamp) >= cutoff)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    );
  };
  
  const chartData = filterDataByTimeRange();
  
  return (
    <div className={cn("bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4", className)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold">Mood & Stress Trends</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button
            variant={timeRange === "week" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeRange("week")}
            className="text-sm"
          >
            Week
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeRange("month")}
            className="text-sm"
          >
            Month
          </Button>
          <Button
            variant={timeRange === "year" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeRange("year")}
            className="text-sm"
          >
            Year
          </Button>
        </div>
      </div>
      
      <ChartContainer
        config={{
          mood: {
            label: "Mood",
            color: "hsl(var(--primary))"
          },
          stress: {
            label: "Stress",
            color: "hsl(var(--secondary, 24 94% 53%))"
          }
        }}
        className="w-full"
      >
        <div className="h-[220px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary, 24 94% 53%))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--secondary, 24 94% 53%))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis 
                  dataKey="date" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  className="text-slate-500 dark:text-slate-400"
                />
                <YAxis 
                  domain={[0, 6]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(value) => {
                    const moodLabels = {
                      1: "Terrible",
                      2: "Bad",
                      3: "Okay",
                      4: "Good",
                      5: "Great"
                    };
                    return moodLabels[value as keyof typeof moodLabels] || "";
                  }}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={70}
                  className="text-slate-500 dark:text-slate-400"
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1}
                  fill="url(#colorMood)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="hsl(var(--secondary, 24 94% 53%))" 
                  fillOpacity={1}
                  fill="url(#colorStress)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-slate-500 dark:text-slate-400">
              No mood data available for this time period
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-[2px] bg-primary"></div>
            <span className="text-sm text-slate-500 dark:text-slate-400">Mood</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-[2px] bg-secondary"></div>
            <span className="text-sm text-slate-500 dark:text-slate-400">Stress</span>
          </div>
        </div>
      </ChartContainer>
    </div>
  );
}
