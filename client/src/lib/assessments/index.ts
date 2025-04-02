import { unit1Assessment } from './unit1Assessment';
import { unit2Assessment } from './unit2Assessment';
import { unit3Assessment } from './unit3Assessment';

// Export all unit assessments
export const assessments = {
  1: unit1Assessment,
  2: unit2Assessment,
  3: unit3Assessment,
  // Add more units as they are created
};

// Helper function to get assessment by unit ID
export function getAssessmentByUnitId(unitId: number) {
  return assessments[unitId as keyof typeof assessments] || null;
}

// Assessment types
export interface AssessmentQuestion {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface Assessment {
  unitId: number;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
}