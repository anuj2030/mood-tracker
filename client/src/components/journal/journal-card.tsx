import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Journal } from "@shared/schema";
import JournalEntry from "./journal-entry";
import { formatRelativeTime, moodColors } from "@/lib/utils";

interface JournalCardProps {
  entries: Journal[];
  className?: string;
}

export default function JournalCard({ entries, className }: JournalCardProps) {
  const hasEntries = entries && entries.length > 0;
  
  return (
    <div className={className}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold">Recent Journal Entries</h2>
          <Link href="/journal">
            <a className="text-sm text-primary hover:underline">View all</a>
          </Link>
        </div>
        
        <div className="space-y-3">
          {hasEntries ? (
            entries.slice(0, 2).map((entry) => (
              <JournalEntry
                key={entry.id}
                title={entry.title}
                content={entry.content}
                mood={entry.mood || ""}
                time={formatRelativeTime(entry.timestamp)}
              />
            ))
          ) : (
            <div className="text-center py-6 text-slate-500 dark:text-slate-400">
              <p>No journal entries yet.</p>
              <p className="text-sm mt-1">Start journaling to track your thoughts and feelings.</p>
            </div>
          )}
        </div>
        
        <Link href="/journal/new">
          <a className="w-full mt-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 block text-center">
            Create New Entry
          </a>
        </Link>
      </div>
    </div>
  );
}
