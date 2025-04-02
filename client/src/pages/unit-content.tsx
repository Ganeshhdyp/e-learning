import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { DEFAULT_UNIT_CONTENT } from '@/lib/constants';
import { unitContents } from '@/lib/unitContent';
import UnitContentDisplay from '@/components/unit-content-display';
import { Unit } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';
import AuthCheck from '@/components/auth-check';

export default function UnitContent() {
  const [_, params] = useRoute('/units/:unitId');
  const unitId = params?.unitId ? parseInt(params.unitId) : 1;
  const [progress, setProgress] = useState(0);
  
  // Fetch unit data
  const { data: unit, isLoading: isLoadingUnit } = useQuery({
    queryKey: [`/api/units/${unitId}`],
  });
  
  // Fetch progress data
  const { data: progressData, isLoading: isLoadingProgress } = useQuery({
    queryKey: [`/api/progress/${unitId}`],
  });
  
  // Update progress mutation
  const progressMutation = useMutation({
    mutationFn: async (newProgress: number) => {
      return apiRequest('POST', '/api/progress', {
        unitId,
        score: newProgress,
        completed: newProgress >= 100,
        lastAttempt: new Date().toISOString()
      });
    },
  });
  
  // Get content for current unit
  const unitContent = unitContents[unitId as keyof typeof unitContents];
  
  // Update progress - since we're showing all content at once, mark as fully viewed
  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
    
    // Only update if progress is greater than stored progress
    if (progressData && (!(progressData as any).score || newProgress > (progressData as any).score)) {
      progressMutation.mutate(newProgress);
    }
  };
  
  // Set initial progress from API data when it loads and update to 100% after delay
  useEffect(() => {
    // First set initial progress from API data
    if (progressData) {
      const currentProgress = (progressData as any).score || 0;
      setProgress(currentProgress);
      
      // Then set a timer to update to 100% after delay
      const timer = setTimeout(() => {
        updateProgress(100);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [unitId, progressData]);
  
  // Get previous and next unit IDs
  const prevUnitId = unitId > 1 ? unitId - 1 : null;
  const nextUnitId = unitId < 6 ? unitId + 1 : null;
  
  if (isLoadingUnit || isLoadingProgress) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-6 w-32" />
        </div>
        
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }
  
  // Handle case where unit content is not available
  if (!unitContent) {
    return (
      <AuthCheck>
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-bold text-neutral-800">
              Unit {unitId}: {(unit as any)?.title || 'Cyber Security Fundamentals'}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-600">Progress: {progress}%</span>
              <div className="w-24 h-2 bg-neutral-200 rounded-full">
                <div 
                  className="h-full bg-success rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-medium text-amber-600 mb-4">Content Coming Soon</h3>
            <p className="mb-4">The detailed content for this unit is being developed. Please check back later for the full material.</p>
            
            <h3 className="text-xl font-medium mb-4">Unit Overview</h3>
            <p className="mb-4">{DEFAULT_UNIT_CONTENT.introduction}</p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Key Topics in this Unit</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              {DEFAULT_UNIT_CONTENT.keyTopics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
            
            <div className="my-6 p-4 bg-neutral-50 border-l-4 border-info rounded">
              <h3 className="text-lg font-medium mb-2">Important Note</h3>
              <p>{DEFAULT_UNIT_CONTENT.importantNote}</p>
            </div>
          </div>
          
          {/* Navigation */}
          <UnitNavigation 
            prevUnitId={prevUnitId} 
            nextUnitId={nextUnitId} 
            unitId={unitId} 
          />
        </div>
      </AuthCheck>
    );
  }
  
  return (
    <AuthCheck>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-heading font-bold text-neutral-800">
            Unit {unitId}: {(unit as any)?.title || 'Cyber Security Fundamentals'}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-600">Progress: {progress}%</span>
            <div className="w-24 h-2 bg-neutral-200 rounded-full">
              <div 
                className="h-full bg-success rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Main Unit Content */}
        <UnitContentDisplay unit={unit as Unit} content={unitContent} />
        
        {/* Important Note Box */}
        <div className="mt-6 p-4 bg-neutral-50 border-l-4 border-info rounded shadow-sm">
          <h3 className="text-lg font-medium mb-2">Important Note</h3>
          <p>{DEFAULT_UNIT_CONTENT.importantNote}</p>
        </div>
        
        {/* Navigation */}
        <UnitNavigation 
          prevUnitId={prevUnitId} 
          nextUnitId={nextUnitId} 
          unitId={unitId} 
        />
      </div>
    </AuthCheck>
  );
}

// Extract navigation to a component for reuse
function UnitNavigation({ prevUnitId, nextUnitId, unitId }: { prevUnitId: number | null, nextUnitId: number | null, unitId: number }) {
  return (
    <div className="flex justify-between mt-8">
      {prevUnitId ? (
        <Link href={`/units/${prevUnitId}`}>
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Previous Unit
          </Button>
        </Link>
      ) : (
        <Button variant="outline" disabled className="flex items-center">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Previous Unit
        </Button>
      )}
      
      <Link href={`/units/${unitId}/assessment`}>
        <Button className="flex items-center bg-primary text-white hover:bg-primary/90">
          Take Assessment
          <ArrowRight className="h-5 w-5 ml-1" />
        </Button>
      </Link>
      
      {nextUnitId ? (
        <Link href={`/units/${nextUnitId}`}>
          <Button variant="outline" className="flex items-center">
            Next Unit
            <ArrowRight className="h-5 w-5 ml-1" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" disabled className="flex items-center">
          Next Unit
          <ArrowRight className="h-5 w-5 ml-1" />
        </Button>
      )}
    </div>
  );
}
