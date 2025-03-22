import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return format(dateObj, "MMM d, yyyy");
}

export function formatTime(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return format(dateObj, "h:mm a");
}

export function formatRelativeTime(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

export const moodEmojis = {
  "Great": "😃",
  "Good": "🙂",
  "Okay": "😐",
  "Bad": "😕",
  "Terrible": "😞"
};

export const moodColors = {
  "Great": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  "Good": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "Okay": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Bad": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  "Terrible": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
};
