import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TherapyToolItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconBg: string;
  href: string;
  className?: string;
}

export default function TherapyToolItem({
  title,
  description,
  icon,
  iconBg,
  href,
  className
}: TherapyToolItemProps) {
  return (
    <Link href={href}>
      <a className={cn(
        "p-3 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition",
        className
      )}>
        <div className="flex items-center gap-2 mb-2">
          <div className={cn("rounded-full p-1.5", iconBg)}>
            {icon}
          </div>
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
      </a>
    </Link>
  );
}
