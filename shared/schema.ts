import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema with added metadata field for additional user info
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  metadata: jsonb("metadata"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  metadata: true,
});

// Units table to store unit information
export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  pdfPath: text("pdf_path").notNull(),
});

export const insertUnitSchema = createInsertSchema(units).pick({
  title: true,
  description: true,
  pdfPath: true,
});

// Questions table to store MCQ questions
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  unitId: integer("unit_id").notNull(),
  text: text("text").notNull(),
  options: jsonb("options").notNull(), // Array of strings as options
  correctAnswer: integer("correct_answer").notNull(), // Index of the correct option
});

export const insertQuestionSchema = createInsertSchema(questions).pick({
  unitId: true,
  text: true,
  options: true,
  correctAnswer: true,
});

// User progress table to track progress
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  unitId: integer("unit_id").notNull(),
  completed: boolean("completed").default(false),
  score: integer("score").default(0),
  lastAttempt: text("last_attempt"), // Store date string
});

export const insertProgressSchema = createInsertSchema(progress).pick({
  userId: true,
  unitId: true,
  completed: true,
  score: true,
  lastAttempt: true,
});

// Types derived from schemas
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Unit = typeof units.$inferSelect;
export type InsertUnit = z.infer<typeof insertUnitSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
