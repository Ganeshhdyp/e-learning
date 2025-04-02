import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { apiRequest } from '@/lib/queryClient';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { assessments, Assessment, AssessmentQuestion } from '@/lib/assessments';
import AuthCheck from '@/components/auth-check';

// Assessment component for testing user knowledge on unit content
export default function AssessmentPage() {
  const [_, params] = useRoute('/units/:unitId/assessment');
  const unitId = params?.unitId ? parseInt(params.unitId) : 1;
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    total: number;
    percentage: number;
    results: {
      questionId: number;
      userAnswer: number;
      correctAnswer: number;
      isCorrect: boolean;
    }[];
  } | null>(null);
  
  // Get local assessment data based on unit ID
  const localAssessment = assessments[unitId as keyof typeof assessments] as Assessment | undefined;
  
  // Fetch unit data from API
  const { data: unit = { title: `Unit ${unitId}` } } = useQuery({
    queryKey: [`/api/units/${unitId}`],
  });
  
  // Fetch questions for this unit from API
  const { data: apiQuestions = [], isLoading: isApiLoading } = useQuery({
    queryKey: [`/api/units/${unitId}/questions`],
  });
  
  // Use local assessment questions if API doesn't return any
  const questions: AssessmentQuestion[] = (apiQuestions as any[]).length > 0 
    ? apiQuestions as any[] 
    : (localAssessment?.questions || []);
  
  const isLoading = isApiLoading && questions.length === 0;
  
  // Initialize answers array with the correct length
  useEffect(() => {
    if (questions.length > 0) {
      // Always reset answers when questions change or when answers array is empty
      setAnswers(new Array(questions.length).fill(-1));
    }
  }, [questions]);
  
  // Query client for cache invalidation
  const queryClient = useQueryClient();

  // Save progress mutation
  const progressMutation = useMutation({
    mutationFn: async (score: number) => {
      return apiRequest(
        'POST',
        '/api/progress',
        { unitId, score }
      );
    },
    onSuccess: () => {
      // Invalidate relevant queries to refresh the data
      queryClient.invalidateQueries({ queryKey: [`/api/progress`] });
      queryClient.invalidateQueries({ queryKey: [`/api/progress/${unitId}`] });
    }
  });

  // Handle form submission - if we're using local data, calculate results locally
  const handleSubmit = () => {
    if (answers.length > 0) {
      // Calculate local results
      const questionResults = questions.map((question: AssessmentQuestion, index: number) => {
        const userAnswer = answers[index];
        const correctAnswer = question.correctOption !== undefined 
          ? question.correctOption 
          : (question as any).correctAnswer;
        
        return {
          questionId: question.id,
          userAnswer,
          correctAnswer,
          isCorrect: userAnswer === correctAnswer
        };
      });
      
      const correctCount = questionResults.filter((r: {isCorrect: boolean}) => r.isCorrect).length;
      const totalQuestions = questions.length;
      const percentage = Math.round((correctCount / totalQuestions) * 100);
      
      setResults({
        score: correctCount,
        total: totalQuestions,
        percentage,
        results: questionResults
      });
      
      // Save progress to the server
      progressMutation.mutate(percentage);
      
      setSubmitted(true);
    }
  };
  
  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };
  
  const handleRetake = () => {
    setSubmitted(false);
    setResults(null);
    setAnswers(new Array(questions.length).fill(-1));
  };
  
  const allQuestionsAnswered = answers.length === questions.length && !answers.includes(-1);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  const assessmentTitle = localAssessment?.title || (unit as {title?: string})?.title || `Unit ${unitId} Assessment`;
  
  return (
    <AuthCheck>
      <Card className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">
            {assessmentTitle}
          </h2>
        
        {!submitted ? (
          <>
            <p className="mb-6 text-neutral-600">
              Please answer all questions to test your understanding of the unit materials.
            </p>
            
            {/* Questions List */}
            <div className="space-y-8">
              {questions.map((question: AssessmentQuestion, questionIndex: number) => (
                <div key={question.id} className="border-b border-neutral-200 pb-6 mb-6 last:border-b-0">
                  <h3 className="font-medium text-lg mb-3">
                    Question {questionIndex + 1}: {question.text}
                  </h3>
                  
                  <RadioGroup
                    value={answers[questionIndex] >= 0 ? answers[questionIndex].toString() : undefined}
                    onValueChange={(value) => handleAnswerChange(questionIndex, parseInt(value))}
                    className="space-y-2 ml-1"
                  >
                    {question.options.map((option: string, optionIndex: number) => (
                      <div key={optionIndex} className="flex items-center space-x-3 p-2 rounded hover:bg-neutral-50">
                        <RadioGroupItem
                          value={optionIndex.toString()}
                          id={`question-${question.id}-option-${optionIndex}`}
                        />
                        <Label
                          htmlFor={`question-${question.id}-option-${optionIndex}`}
                          className="cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
            
            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={questions.length === 0}
                className="px-6 py-2 rounded-md shadow-sm"
              >
                Submit Assessment
              </Button>
              {!allQuestionsAnswered && questions.length > 0 && (
                <p className="text-xs text-amber-600 mt-2">
                  Note: For complete results, answer all questions before submitting.
                </p>
              )}
            </div>
          </>
        ) : results && (
          /* Results View */
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary bg-opacity-10 rounded-full mb-4">
                <span className="text-3xl font-bold text-primary">{results.score}/{results.total}</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Your Score: {results.percentage}%</h3>
              <p className="text-neutral-600">
                {results.percentage === 100 
                  ? "Excellent work! You've mastered this unit." 
                  : "Keep learning to improve your understanding."}
              </p>
            </div>
            
            {/* Feedback on Questions */}
            <div className="space-y-6 mb-8">
              {results.results.map((result, index) => {
                const question = questions[index] as AssessmentQuestion;
                const isCorrect = result.isCorrect;
                
                return (
                  <div 
                    key={result.questionId}
                    className={cn(
                      "border-l-4 p-4 rounded",
                      isCorrect 
                        ? "bg-green-50 border-green-500" 
                        : "bg-red-50 border-red-500"
                    )}
                  >
                    <h4 className="font-medium mb-2">
                      Question {index + 1}: {question.text}
                    </h4>
                    <p className="mb-1">
                      Your answer: 
                      <span 
                        className={cn(
                          "ml-1 font-medium",
                          isCorrect ? "text-green-600" : "text-red-600"
                        )}
                      >
                        {question.options[result.userAnswer]}
                      </span>
                      {isCorrect ? (
                        <CheckCircle className="inline-block ml-1 h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="inline-block ml-1 h-4 w-4 text-red-600" />
                      )}
                    </p>
                    
                    {!isCorrect && (
                      <p>
                        Correct answer: 
                        <span className="ml-1 text-green-600 font-medium">
                          {question.options[result.correctAnswer]}
                        </span>
                      </p>
                    )}

                    {question.explanation && (
                      <div className="mt-2 p-2 bg-gray-50 text-sm">
                        <strong>Explanation: </strong>{question.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handleRetake}
              >
                Retake Assessment
              </Button>
              
              <Link href={`/units/${unitId}`}>
                <Button>
                  Back to Unit Content
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </AuthCheck>
  );
}
