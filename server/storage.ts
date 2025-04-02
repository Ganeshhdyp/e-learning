import { 
  users, type User, type InsertUser,
  units, type Unit, type InsertUnit,
  questions, type Question, type InsertQuestion,
  progress, type Progress, type InsertProgress
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Unit operations
  getUnits(): Promise<Unit[]>;
  getUnit(id: number): Promise<Unit | undefined>;
  createUnit(unit: InsertUnit): Promise<Unit>;
  
  // Question operations
  getQuestionsByUnitId(unitId: number): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // Progress operations
  getProgressByUserId(userId: number): Promise<Progress[]>;
  getProgressByUserAndUnit(userId: number, unitId: number): Promise<Progress | undefined>;
  createOrUpdateProgress(progress: InsertProgress): Promise<Progress>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private units: Map<number, Unit>;
  private questions: Map<number, Question>;
  private progresses: Map<number, Progress>;
  private currentUserId: number;
  private currentUnitId: number;
  private currentQuestionId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.units = new Map();
    this.questions = new Map();
    this.progresses = new Map();
    this.currentUserId = 1;
    this.currentUnitId = 1;
    this.currentQuestionId = 1;
    this.currentProgressId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create units data
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
        pdfPath: `/pdfs/unit-${index + 1}.pdf` // This would be the path to where PDFs are stored
      });
    });

    // Create sample questions for each unit
    for (let unitId = 1; unitId <= 6; unitId++) {
      // 5 questions per unit
      for (let i = 0; i < 5; i++) {
        this.createQuestion({
          unitId,
          text: `Question ${i + 1} for Unit ${unitId}?`,
          options: [`Option A for U${unitId}Q${i+1}`, `Option B for U${unitId}Q${i+1}`, `Option C for U${unitId}Q${i+1}`, `Option D for U${unitId}Q${i+1}`],
          correctAnswer: Math.floor(Math.random() * 4) // Random correct answer index (0-3)
        });
      }
    }
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Unit operations
  async getUnits(): Promise<Unit[]> {
    return Array.from(this.units.values());
  }
  
  async getUnit(id: number): Promise<Unit | undefined> {
    return this.units.get(id);
  }
  
  async createUnit(insertUnit: InsertUnit): Promise<Unit> {
    const id = this.currentUnitId++;
    const unit: Unit = { ...insertUnit, id };
    this.units.set(id, unit);
    return unit;
  }
  
  // Question operations
  async getQuestionsByUnitId(unitId: number): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(
      (question) => question.unitId === unitId
    );
  }
  
  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.currentQuestionId++;
    const question: Question = { ...insertQuestion, id };
    this.questions.set(id, question);
    return question;
  }
  
  // Progress operations
  async getProgressByUserId(userId: number): Promise<Progress[]> {
    return Array.from(this.progresses.values()).filter(
      (progress) => progress.userId === userId
    );
  }
  
  async getProgressByUserAndUnit(userId: number, unitId: number): Promise<Progress | undefined> {
    return Array.from(this.progresses.values()).find(
      (progress) => progress.userId === userId && progress.unitId === unitId
    );
  }
  
  async createOrUpdateProgress(insertProgress: InsertProgress): Promise<Progress> {
    // Check if progress already exists
    const existingProgress = await this.getProgressByUserAndUnit(
      insertProgress.userId,
      insertProgress.unitId
    );
    
    if (existingProgress) {
      // Update existing progress
      const updatedProgress: Progress = {
        ...existingProgress,
        ...insertProgress,
      };
      this.progresses.set(existingProgress.id, updatedProgress);
      return updatedProgress;
    } else {
      // Create new progress
      const id = this.currentProgressId++;
      const newProgress: Progress = { ...insertProgress, id };
      this.progresses.set(id, newProgress);
      return newProgress;
    }
  }
}

export const storage = new MemStorage();
