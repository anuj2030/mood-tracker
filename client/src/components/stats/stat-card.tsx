import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  iconColor: string;
  iconBgColor: string;
  timeframe?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconColor,
  iconBgColor,
  timeframe = "Today",
  className
}: StatCardProps) {
  return (
    <div className={cn("bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
          {timeframe}
        </div>
      </div>
      <div className="flex items-center">
        <div className={cn("rounded-full p-2 mr-3", iconBgColor)}>
          <div className={cn("w-6 h-6", iconColor)}>
            {icon}
          </div>
        </div>
        <div>
          <p className="text-xl font-bold">{value}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
