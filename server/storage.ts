import { users, type User, type InsertUser, moods, type Mood, type InsertMood, journals, type Journal, type InsertJournal, chats, type Chat, type InsertChat } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Mood tracking operations
  getMoodsByUserId(userId: number): Promise<Mood[]>;
  getMoodById(id: number): Promise<Mood | undefined>;
  createMood(userId: number, mood: InsertMood): Promise<Mood>;
  
  // Journal operations
  getJournalsByUserId(userId: number): Promise<Journal[]>;
  getJournalById(id: number): Promise<Journal | undefined>;
  createJournal(userId: number, journal: InsertJournal): Promise<Journal>;
  
  // Chat operations
  getChatsByUserId(userId: number): Promise<Chat[]>;
  createChatMessage(userId: number, chat: InsertChat): Promise<Chat>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private moods: Map<number, Mood>;
  private journals: Map<number, Journal>;
  private chats: Map<number, Chat>;
  sessionStore: session.SessionStore;
  
  private userCurrentId: number;
  private moodCurrentId: number;
  private journalCurrentId: number;
  private chatCurrentId: number;

  constructor() {
    this.users = new Map();
    this.moods = new Map();
    this.journals = new Map();
    this.chats = new Map();
    
    this.userCurrentId = 1;
    this.moodCurrentId = 1;
    this.journalCurrentId = 1;
    this.chatCurrentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Mood methods
  async getMoodsByUserId(userId: number): Promise<Mood[]> {
    return Array.from(this.moods.values()).filter(
      (mood) => mood.userId === userId,
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
  
  async getMoodById(id: number): Promise<Mood | undefined> {
    return this.moods.get(id);
  }
  
  async createMood(userId: number, insertMood: InsertMood): Promise<Mood> {
    const id = this.moodCurrentId++;
    const now = new Date();
    const mood: Mood = { 
      ...insertMood, 
      id, 
      userId, 
      timestamp: now 
    };
    this.moods.set(id, mood);
    return mood;
  }
  
  // Journal methods
  async getJournalsByUserId(userId: number): Promise<Journal[]> {
    return Array.from(this.journals.values()).filter(
      (journal) => journal.userId === userId,
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
  
  async getJournalById(id: number): Promise<Journal | undefined> {
    return this.journals.get(id);
  }
  
  async createJournal(userId: number, insertJournal: InsertJournal): Promise<Journal> {
    const id = this.journalCurrentId++;
    const now = new Date();
    const journal: Journal = { 
      ...insertJournal, 
      id, 
      userId, 
      timestamp: now 
    };
    this.journals.set(id, journal);
    return journal;
  }
  
  // Chat methods
  async getChatsByUserId(userId: number): Promise<Chat[]> {
    return Array.from(this.chats.values()).filter(
      (chat) => chat.userId === userId,
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }
  
  async createChatMessage(userId: number, insertChat: InsertChat): Promise<Chat> {
    const id = this.chatCurrentId++;
    const now = new Date();
    const chat: Chat = { 
      ...insertChat, 
      id, 
      userId, 
      timestamp: now 
    };
    this.chats.set(id, chat);
    return chat;
  }
}

export const storage = new MemStorage();
