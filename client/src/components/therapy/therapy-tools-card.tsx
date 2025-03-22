import { Link } from "wouter";
import TherapyToolItem from "./therapy-tool-item";
import { Circle, Clock, Heart, PenSquare } from "lucide-react";

interface TherapyToolsCardProps {
  className?: string;
}

export default function TherapyToolsCard({ className }: TherapyToolsCardProps) {
  const tools = [
    {
      id: 1,
      title: "Breathing Exercise",
      description: "5-minute guided breathing",
      icon: <Circle className="w-4 h-4 text-indigo-500" />,
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      href: "/therapy-tools/breathing"
    },
    {
      id: 2,
      title: "Meditation",
      description: "10-minute guided session",
      icon: <Clock className="w-4 h-4 text-purple-500" />,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      href: "/therapy-tools/meditation"
    },
    {
      id: 3,
      title: "Thought Journal",
      description: "Challenge negative thoughts",
      icon: <PenSquare className="w-4 h-4 text-emerald-500" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      href: "/therapy-tools/thought-journal"
    },
    {
      id: 4,
      title: "Self-Compassion",
      description: "Practice self-kindness",
      icon: <Heart className="w-4 h-4 text-rose-500" />,
      iconBg: "bg-rose-100 dark:bg-rose-900/30",
      href: "/therapy-tools/self-compassion"
    }
  ];
  
  return (
    <div className={className}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold">Therapy Tools</h2>
          <Link href="/therapy-tools">
            <a className="text-sm text-primary hover:underline">View all</a>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => (
            <TherapyToolItem
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              iconBg={tool.iconBg}
              href={tool.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
