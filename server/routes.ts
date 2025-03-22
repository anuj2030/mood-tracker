import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { insertMoodSchema, insertJournalSchema, insertChatSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // API routes
  // Middleware to check if user is authenticated
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
  
  // Mood tracking routes
  app.get("/api/moods", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const moods = await storage.getMoodsByUserId(userId);
      res.json(moods);
    } catch (error) {
      next(error);
    }
  });
  
  app.post("/api/moods", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const validatedData = insertMoodSchema.parse(req.body);
      const mood = await storage.createMood(userId, validatedData);
      res.status(201).json(mood);
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/moods/:id", requireAuth, async (req, res, next) => {
    try {
      const moodId = parseInt(req.params.id);
      const mood = await storage.getMoodById(moodId);
      
      if (!mood) {
        return res.status(404).json({ message: "Mood entry not found" });
      }
      
      if (mood.userId !== req.user!.id) {
        return res.status(403).json({ message: "Not authorized to access this mood entry" });
      }
      
      res.json(mood);
    } catch (error) {
      next(error);
    }
  });
  
  // Journal routes
  app.get("/api/journals", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const journals = await storage.getJournalsByUserId(userId);
      res.json(journals);
    } catch (error) {
      next(error);
    }
  });
  
  app.post("/api/journals", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const validatedData = insertJournalSchema.parse(req.body);
      const journal = await storage.createJournal(userId, validatedData);
      res.status(201).json(journal);
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/journals/:id", requireAuth, async (req, res, next) => {
    try {
      const journalId = parseInt(req.params.id);
      const journal = await storage.getJournalById(journalId);
      
      if (!journal) {
        return res.status(404).json({ message: "Journal entry not found" });
      }
      
      if (journal.userId !== req.user!.id) {
        return res.status(403).json({ message: "Not authorized to access this journal entry" });
      }
      
      res.json(journal);
    } catch (error) {
      next(error);
    }
  });
  
  // AI Companion Chat routes
  app.get("/api/chats", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const chats = await storage.getChatsByUserId(userId);
      res.json(chats);
    } catch (error) {
      next(error);
    }
  });
  
  app.post("/api/chats", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const validatedData = insertChatSchema.parse(req.body);
      
      // Save user message
      const userMessage = await storage.createChatMessage(userId, validatedData);
      
      // If this is a user message, generate an AI response
      if (validatedData.isUserMessage) {
        // Simple AI response logic (in a real app, this would call an actual AI service)
        const aiResponse = generateAIResponse(validatedData.message);
        const aiMessage = await storage.createChatMessage(userId, {
          message: aiResponse,
          isUserMessage: false
        });
        
        // Return both messages
        res.status(201).json([userMessage, aiMessage]);
      } else {
        // If it's not a user message (e.g. system message), just return it
        res.status(201).json([userMessage]);
      }
    } catch (error) {
      next(error);
    }
  });
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}

// Simple AI response generator
function generateAIResponse(userMessage: string): string {
  const lowerCaseMessage = userMessage.toLowerCase();
  
  if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
    return "Hello! I'm MindfulMe AI, your companion. How are you feeling today?";
  } else if (lowerCaseMessage.includes("sad") || lowerCaseMessage.includes("depress")) {
    return "I'm sorry to hear you're feeling down. Remember that it's okay to feel this way sometimes. Would you like to try a breathing exercise to help calm your mind?";
  } else if (lowerCaseMessage.includes("anxious") || lowerCaseMessage.includes("stress")) {
    return "I understand that anxiety can be challenging. Try focusing on your breathing - inhale deeply for 4 seconds, hold for 4 seconds, and exhale for 6 seconds. This can help activate your parasympathetic nervous system.";
  } else if (lowerCaseMessage.includes("happy") || lowerCaseMessage.includes("good")) {
    return "I'm glad to hear you're feeling good! It's important to acknowledge and celebrate these positive moments.";
  } else if (lowerCaseMessage.includes("tired") || lowerCaseMessage.includes("exhausted")) {
    return "Being tired can affect your mood and mental wellbeing. Make sure you're giving yourself enough time to rest. Is there anything specific that's draining your energy lately?";
  } else if (lowerCaseMessage.includes("lonely") || lowerCaseMessage.includes("alone")) {
    return "Feeling lonely is a common human experience. Remember that connection comes in many forms. Is there someone you could reach out to today, even for a brief conversation?";
  } else {
    return "Thank you for sharing. I'm here to listen and support you. Would you like to tell me more about how you're feeling?";
  }
}
