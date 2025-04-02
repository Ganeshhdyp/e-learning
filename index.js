// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  units;
  questions;
  progresses;
  currentUserId;
  currentUnitId;
  currentQuestionId;
  currentProgressId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.units = /* @__PURE__ */ new Map();
    this.questions = /* @__PURE__ */ new Map();
    this.progresses = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentUnitId = 1;
    this.currentQuestionId = 1;
    this.currentProgressId = 1;
    this.initializeData();
  }
  initializeData() {
    const unitTitles = [
      "Introduction to Cyber Security",
      "Network Security Fundamentals",
      "Cryptography and Encryption",
      "Security Policies and Risk Management",
      "Penetration Testing",
      "Incident Response and Forensics"
    ];
    unitTitles.forEach((title, index) => {
      this.createUnit({
        title,
        description: `Learn about ${title.toLowerCase()} concepts and practices.`,
        pdfPath: `/pdfs/unit-${index + 1}.pdf`
        // This would be the path to where PDFs are stored
      });
    });
    for (let unitId = 1; unitId <= 6; unitId++) {
      for (let i = 0; i < 5; i++) {
        this.createQuestion({
          unitId,
          text: `Question ${i + 1} for Unit ${unitId}?`,
          options: [`Option A for U${unitId}Q${i + 1}`, `Option B for U${unitId}Q${i + 1}`, `Option C for U${unitId}Q${i + 1}`, `Option D for U${unitId}Q${i + 1}`],
          correctAnswer: Math.floor(Math.random() * 4)
          // Random correct answer index (0-3)
        });
      }
    }
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Unit operations
  async getUnits() {
    return Array.from(this.units.values());
  }
  async getUnit(id) {
    return this.units.get(id);
  }
  async createUnit(insertUnit) {
    const id = this.currentUnitId++;
    const unit = { ...insertUnit, id };
    this.units.set(id, unit);
    return unit;
  }
  // Question operations
  async getQuestionsByUnitId(unitId) {
    return Array.from(this.questions.values()).filter(
      (question) => question.unitId === unitId
    );
  }
  async createQuestion(insertQuestion) {
    const id = this.currentQuestionId++;
    const question = { ...insertQuestion, id };
    this.questions.set(id, question);
    return question;
  }
  // Progress operations
  async getProgressByUserId(userId) {
    return Array.from(this.progresses.values()).filter(
      (progress2) => progress2.userId === userId
    );
  }
  async getProgressByUserAndUnit(userId, unitId) {
    return Array.from(this.progresses.values()).find(
      (progress2) => progress2.userId === userId && progress2.unitId === unitId
    );
  }
  async createOrUpdateProgress(insertProgress) {
    const existingProgress = await this.getProgressByUserAndUnit(
      insertProgress.userId,
      insertProgress.unitId
    );
    if (existingProgress) {
      const updatedProgress = {
        ...existingProgress,
        ...insertProgress
      };
      this.progresses.set(existingProgress.id, updatedProgress);
      return updatedProgress;
    } else {
      const id = this.currentProgressId++;
      const newProgress = { ...insertProgress, id };
      this.progresses.set(id, newProgress);
      return newProgress;
    }
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  metadata: jsonb("metadata")
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  metadata: true
});
var units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  pdfPath: text("pdf_path").notNull()
});
var insertUnitSchema = createInsertSchema(units).pick({
  title: true,
  description: true,
  pdfPath: true
});
var questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  unitId: integer("unit_id").notNull(),
  text: text("text").notNull(),
  options: jsonb("options").notNull(),
  // Array of strings as options
  correctAnswer: integer("correct_answer").notNull()
  // Index of the correct option
});
var insertQuestionSchema = createInsertSchema(questions).pick({
  unitId: true,
  text: true,
  options: true,
  correctAnswer: true
});
var progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  unitId: integer("unit_id").notNull(),
  completed: boolean("completed").default(false),
  score: integer("score").default(0),
  lastAttempt: text("last_attempt")
  // Store date string
});
var insertProgressSchema = createInsertSchema(progress).pick({
  userId: true,
  unitId: true,
  completed: true,
  score: true,
  lastAttempt: true
});

// server/routes.ts
import { z } from "zod";
import * as crypto from "crypto";
async function registerRoutes(app2) {
  app2.get("/api/units", async (req, res) => {
    try {
      const units2 = await storage.getUnits();
      res.json(units2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch units" });
    }
  });
  app2.get("/api/units/:id", async (req, res) => {
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
  app2.get("/api/units/:id/questions", async (req, res) => {
    try {
      const unitId = parseInt(req.params.id);
      if (isNaN(unitId)) {
        return res.status(400).json({ message: "Invalid unit ID" });
      }
      const questions2 = await storage.getQuestionsByUnitId(unitId);
      res.json(questions2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });
  app2.post("/api/progress", async (req, res) => {
    try {
      const userId = 1;
      const validatedData = insertProgressSchema.parse({
        ...req.body,
        userId
      });
      const progress2 = await storage.createOrUpdateProgress(validatedData);
      res.json(progress2);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });
  app2.get("/api/progress", async (req, res) => {
    try {
      const userId = 1;
      const progress2 = await storage.getProgressByUserId(userId);
      res.json(progress2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });
  app2.get("/api/progress/:unitId", async (req, res) => {
    try {
      const userId = 1;
      const unitId = parseInt(req.params.unitId);
      if (isNaN(unitId)) {
        return res.status(400).json({ message: "Invalid unit ID" });
      }
      const progress2 = await storage.getProgressByUserAndUnit(userId, unitId);
      if (!progress2) {
        return res.json({
          userId,
          unitId,
          completed: false,
          score: 0,
          lastAttempt: null
        });
      }
      res.json(progress2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });
  app2.post("/api/units/:id/assessment", async (req, res) => {
    try {
      const unitId = parseInt(req.params.id);
      const { answers } = req.body;
      if (isNaN(unitId)) {
        return res.status(400).json({ message: "Invalid unit ID" });
      }
      if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ message: "Invalid answers format" });
      }
      const questions2 = await storage.getQuestionsByUnitId(unitId);
      let score = 0;
      const results = questions2.map((question, index) => {
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
      const scorePercentage = Math.round(score / questions2.length * 100);
      const userId = 1;
      await storage.createOrUpdateProgress({
        userId,
        unitId,
        score: scorePercentage,
        completed: true,
        lastAttempt: (/* @__PURE__ */ new Date()).toISOString()
      });
      res.json({
        score,
        total: questions2.length,
        percentage: scorePercentage,
        results
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to process assessment" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const registerSchema = insertUserSchema.extend({
        email: z.string().email("Invalid email address"),
        firstName: z.string().min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        studentId: z.string().min(5, "Student ID must be at least 5 characters"),
        program: z.string().min(1, "Program selection is required"),
        year: z.string().min(1, "Year of study is required")
      });
      const validatedData = registerSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto.pbkdf2Sync(validatedData.password, salt, 1e3, 64, "sha512").toString("hex");
      const user = await storage.createUser({
        username: validatedData.email,
        password: `${salt}:${hash}`,
        // Any additional fields from registration (these will be stored as metadata)
        metadata: JSON.stringify({
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          studentId: validatedData.studentId,
          program: validatedData.program,
          year: validatedData.year
        })
      });
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
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      const user = await storage.getUserByUsername(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const [salt, storedHash] = user.password.split(":");
      const hash = crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
      if (storedHash !== hash) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
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
  app2.get("/api/auth/me", async (req, res) => {
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
  app2.post("/api/auth/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  base: "/your-repository-name/",
  // 👈 Replace with your actual GitHub repo name
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
