import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
});

// Mood tracking model
export const moods = pgTable("moods", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  mood: text("mood").notNull(), // 'Great', 'Good', 'Okay', 'Bad', 'Terrible'
  stress: text("stress"), // 'Low', 'Medium', 'High'
  sleep: text("sleep"), // Sleep quality
  sleepDuration: text("sleep_duration"), // Duration in hours and minutes
  notes: text("notes"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertMoodSchema = createInsertSchema(moods).omit({
  id: true,
}).pick({
  mood: true,
  stress: true,
  sleep: true,
  sleepDuration: true,
  notes: true,
});

// Journal entries model
export const journals = pgTable("journals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  mood: text("mood"), // Associated mood tag
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertJournalSchema = createInsertSchema(journals).omit({
  id: true,
}).pick({
  title: true,
  content: true,
  mood: true,
});

// AI companion chat model
export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  message: text("message").notNull(),
  isUserMessage: boolean("is_user_message").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertChatSchema = createInsertSchema(chats).omit({
  id: true,
}).pick({
  message: true,
  isUserMessage: true,
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMood = z.infer<typeof insertMoodSchema>;
export type Mood = typeof moods.$inferSelect;

export type InsertJournal = z.infer<typeof insertJournalSchema>;
export type Journal = typeof journals.$inferSelect;

export type InsertChat = z.infer<typeof insertChatSchema>;
export type Chat = typeof chats.$inferSelect;
