import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Lock, Code, BookOpen, CheckCircle, Shield, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [expandedUnit, setExpandedUnit] = useState<number | null>(null);
  
  interface UnitType {
    id: number;
    title: string;
    description: string;
  }

  interface ProgressType {
    unitId: number;
    score: number;
  }
  
  const { data: units = [] } = useQuery<UnitType[]>({
    queryKey: ['/api/units'],
  });
  
  const { data: progressData = [] } = useQuery<ProgressType[]>({
    queryKey: ['/api/progress'],
  });
  
  // Process progress data for easier access
  const progressByUnit = progressData.reduce((acc: Record<number, number>, curr: ProgressType) => {
    acc[curr.unitId] = curr.score || 0;
    return acc;
  }, {});
  
  // Auto-expand the current unit
  useEffect(() => {
    if (location.startsWith('/units/')) {
      const unitIdMatch = location.match(/\/units\/(\d+)/);
      if (unitIdMatch && unitIdMatch[1]) {
        setExpandedUnit(parseInt(unitIdMatch[1]));
      }
    }
  }, [location]);
  
  const toggleUnit = (unitId: number) => {
    setExpandedUnit(expandedUnit === unitId ? null : unitId);
  };
  
  const isCurrentPath = (path: string) => {
    if (path.includes(':unitId')) {
      // For paths with parameters like /units/:unitId
      const pathRegex = path.replace(':unitId', '\\d+');
      return new RegExp(`^${pathRegex}$`).test(location);
    }
    return location === path || location.startsWith(path + '/');
  };
  
  const getUnitProgress = (unitId: number) => {
    return progressByUnit[unitId] || 0;
  };

  // Get unit icon based on unit number
  const getUnitIcon = (unitId: number) => {
    switch (unitId) {
      case 1: return <Shield className="h-4 w-4 mr-2" />;
      case 2: return <BookOpen className="h-4 w-4 mr-2" />;
      case 3: return <Lock className="h-4 w-4 mr-2" />;
      case 4: return <Code className="h-4 w-4 mr-2" />;
      case 5: return <Award className="h-4 w-4 mr-2" />;
      case 6: return <CheckCircle className="h-4 w-4 mr-2" />;
      default: return <BookOpen className="h-4 w-4 mr-2" />;
    }
  };
  
  return (
    <aside
      className={cn(
        "fixed md:static inset-y-0 left-0 z-30 w-72 transform transition-transform duration-300 ease-in-out bg-white shadow-lg md:translate-x-0 md:shadow-none pt-16 md:pt-16 border-r",
        isOpen ? 'translate-x-0' : '-translate-x-full',
        isMobile ? 'absolute' : 'relative'
      )}
    >
      <div className="h-full overflow-y-auto pb-16">
        <div className="bg-primary/5 py-4">
          <div className="px-6">
            <h2 className="font-heading font-bold text-xl bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text mb-1">
              Cyber Security Course
            </h2>
            <p className="text-sm text-neutral-600">Build essential security skills</p>
          </div>
        </div>
        
        <nav className="px-4 py-4">
          <div className="mb-2 px-2 flex justify-between items-center">
            <h3 className="font-medium text-neutral-800">Course Units</h3>
            <span className="text-xs text-neutral-500">{units.length} units</span>
          </div>
          
          {/* Units Navigation */}
          <div className="space-y-2 mt-3">
            {units.map((unit: UnitType) => {
              const progress = getUnitProgress(unit.id);
              const isComplete = progress >= 100;
              return (
                <div key={unit.id} className="rounded-lg overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                  {/* Unit Header */}
                  <div
                    onClick={() => toggleUnit(unit.id)}
                    className={cn(
                      "px-4 py-3 flex justify-between items-center cursor-pointer",
                      isCurrentPath(`/units/${unit.id}`) 
                        ? "bg-primary/10 border-l-4 border-primary" 
                        : "hover:bg-neutral-50"
                    )}
                  >
                    <div className="flex items-center">
                      {getUnitIcon(unit.id)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-neutral-800">Unit {unit.id}</span>
                          {isComplete && <Badge variant="outline" className="bg-green-50 text-green-700 text-[10px] py-0 h-5">COMPLETED</Badge>}
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">{unit.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-neutral-200 rounded-full">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            isComplete ? "bg-green-500" : "bg-primary/70"
                          )}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-neutral-400 transform transition-transform duration-200",
                          expandedUnit === unit.id && "rotate-180"
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Unit Topics */}
                  {expandedUnit === unit.id && (
                    <div className="py-1 border-t border-neutral-100 bg-neutral-50">
                      <Link 
                        href={`/units/${unit.id}`}
                        className={cn(
                          "block w-full text-left px-10 py-2 text-sm hover:bg-neutral-100",
                          isCurrentPath(`/units/${unit.id}`) && "text-primary font-medium"
                        )}
                      >
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 opacity-70" />
                          Unit Content
                        </span>
                      </Link>
                      <Link 
                        href={`/units/${unit.id}/assessment`}
                        className={cn(
                          "block w-full text-left px-10 py-2 text-sm hover:bg-neutral-100",
                          isCurrentPath(`/units/${unit.id}/assessment`) && "text-primary font-medium"
                        )}
                      >
                        <span className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 opacity-70" />
                          Assessment
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Special Topics */}
          <div className="mt-8">
            <Separator className="my-4" />
            <h3 className="font-heading font-medium text-neutral-800 mb-3 px-2 flex items-center">
              Special Topics
              <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700">Advanced</Badge>
            </h3>
            <div className="space-y-2">
              <Link 
                href="/sql-injection"
                className={cn(
                  "flex items-center rounded-md px-4 py-3 font-medium hover:bg-neutral-100 w-full",
                  isCurrentPath("/sql-injection") 
                    ? "bg-gradient-to-r from-amber-50 to-transparent border-l-4 border-amber-500 text-amber-700"
                    : "text-neutral-700"
                )}
              >
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Lock className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <span className="block text-sm">SQL Injection</span>
                  <span className="text-xs text-neutral-500">Database attack techniques</span>
                </div>
              </Link>
              <Link 
                href="/xss"
                className={cn(
                  "flex items-center rounded-md px-4 py-3 font-medium hover:bg-neutral-100 w-full",
                  isCurrentPath("/xss") 
                    ? "bg-gradient-to-r from-blue-50 to-transparent border-l-4 border-blue-500 text-blue-700"
                    : "text-neutral-700"
                )}
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Code className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <span className="block text-sm">Cross-Site Scripting</span>
                  <span className="text-xs text-neutral-500">Client-side attack vectors</span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Course Information */}
          <div className="mt-6">
            <Separator className="my-4" />
            <h3 className="font-heading font-medium text-neutral-800 mb-3 px-2">
              Course Information
            </h3>
            <div className="space-y-2">
              <Link 
                href="/about"
                className={cn(
                  "flex items-center rounded-md px-4 py-3 font-medium hover:bg-neutral-100 w-full",
                  isCurrentPath("/about") 
                    ? "bg-gradient-to-r from-purple-50 to-transparent border-l-4 border-purple-500 text-purple-700"
                    : "text-neutral-700"
                )}
              >
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Award className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <span className="block text-sm">About the Author</span>
                  <span className="text-xs text-neutral-500">Course instructor profile</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
