import { cn, moodColors } from "@/lib/utils";

interface JournalEntryProps {
  title: string;
  content: string;
  mood: string;
  time: string;
  onClick?: () => void;
}

export default function JournalEntry({ title, content, mood, time, onClick }: JournalEntryProps) {
  const moodColor = mood ? moodColors[mood as keyof typeof moodColors] || "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300" : "";
  
  return (
    <div 
      className="p-3 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium">{title}</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">{time}</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{content}</p>
      {mood && (
        <div className={cn("mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", moodColor)}>
          {mood}
        </div>
      )}
    </div>
  );
}
