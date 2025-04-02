import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProgressSchema,
  insertQuestionSchema,
  insertUserSchema
} from "@shared/schema";
import { z } from "zod";
import * as crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Get all units
  app.get("/api/units", async (req, res) => {
    try {
      const units = await storage.getUnits();
      res.json(units);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch units" });
    }
  });

  // Get a specific unit
  app.get("/api/units/:id", async (req, res) => {
    try {
      const unitId = parseInt(req.params.id);
      if (isNaN(unitId)) {
        return res.status(400).json({ message: "Invalid unit ID" });
      }
      
      const unit = await storage.getUnit(unitId);
      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }
      
      res.json(unit);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch unit" });
    }
  });

  // Get questions for a specific unit
  app.get("/api/units/:id/questions", async (req, res) => {
    try {
      const unitId = parseInt(req.params.id);
      if (isNaN(unitId)) {
        return res.status(400).json({ message: "Invalid unit ID" });
      }
      
      const questions = await storage.getQuestionsByUnitId(unitId);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Create/update progress for a user on a unit
  app.post("/api/progress", async (req, res) => {
    try {
      // For demo, we'll use a fixed user ID of 1
      const userId = 1;
      
      const validatedData = insertProgressSchema.parse({
        ...req.body,
        userId
      });
      
      const progress = await storage.createOrUpdateProgress(validatedData);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Get progress for a user
  app.get("/api/progress", async (req, res) => {
    try {
      // For demo, we'll use a fixed user ID of 1
      const userId = 1;
      
      const progress = await storage.getProgressByUserId(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Get progress for a specific unit
  app.get("/api/progress/:unitId", async (req, res) => {
    try {
      // For demo, we'll use a fixed user ID of 1
      const userId = 1;
      const unitId = parseInt(req.params.unitId);
      
      if (isNaN(unitId)) {
        return res.status(400).json({ message: "Invalid unit ID" });
      }
      
      const progress = await storage.getProgressByUserAndUnit(userId, unitId);
      if (!progress) {
        return res.json({ 
          userId,
          unitId,
          completed: false,
          score: 0,
          lastAttempt: null
        });
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Submit assessment answers and get results
  app.post("/api/units/:id/assessment", async (req, res) => {
    try {
      const unitId = parseInt(req.params.id);
      const { answers } = req.body;
      
      if (isNaN(unitId)) {
        return res.status(400).json({ message: "Invalid unit ID" });
      }
      
      if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ message: "Invalid answers format" });
      }
      
      // Get questions for this unit
      const questions = await storage.getQuestionsByUnitId(unitId);
      
      // Calculate score
      let score = 0;
      const results = questions.map((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        if (isCorrect) score++;
        
        return {
          questionId: question.id,
          userAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect
        };
      });
      
      const scorePercentage = Math.round((score / questions.length) * 100);
      
      // Update user progress
      const userId = 1; // For demo, we'll use a fixed user ID
      await storage.createOrUpdateProgress({
        userId,
        unitId,
        score: scorePercentage,
        completed: true,
        lastAttempt: new Date().toISOString()
      });
      
      res.json({
        score,
        total: questions.length,
        percentage: scorePercentage,
        results
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to process assessment" });
    }
  });

  // User registration
  app.post("/api/auth/register", async (req, res) => {
    try {
      // Create a stronger validation schema for registration
      const registerSchema = insertUserSchema.extend({
        email: z.string().email("Invalid email address"),
        firstName: z.string().min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        studentId: z.string().min(5, "Student ID must be at least 5 characters"),
        program: z.string().min(1, "Program selection is required"),
        year: z.string().min(1, "Year of study is required"),
      });

      const validatedData = registerSchema.parse(req.body);
      
      // Check if the username (email) already exists
      const existingUser = await storage.getUserByUsername(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      // Hash the password
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(validatedData.password, salt, 1000, 64, 'sha512').toString('hex');
      
      // Create the user
      const user = await storage.createUser({
        username: validatedData.email,
        password: `${salt}:${hash}`,
        // Any additional fields from registration (these will be stored as metadata)
        metadata: JSON.stringify({
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          studentId: validatedData.studentId,
          program: validatedData.program,
          year: validatedData.year,
        })
      });
      
      // Return the user without the password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // User login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      // Find user by email
      const user = await storage.getUserByUsername(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Verify password
      const [salt, storedHash] = user.password.split(':');
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      
      if (storedHash !== hash) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Set user as authenticated in session or return a token
      // For demo purposes, we'll just return the user ID
      const { password: _, ...userWithoutPassword } = user;
      res.json({ 
        ...userWithoutPassword,
        authenticated: true
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Failed to log in" });
    }
  });

  // Check if user is authenticated
  app.get("/api/auth/me", async (req, res) => {
    // For demo, we'll use a fixed user ID of 1
    // In a real app, you would check session or verify token
    const userId = 1;
    
    try {
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json({ 
        ...userWithoutPassword,
        authenticated: true
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to authenticate" });
    }
  });

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    // In a real app, you would clear session or invalidate token
    res.json({ message: "Logged out successfully" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
