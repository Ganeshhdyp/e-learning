import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, BookOpen, Cpu, Shield, FileText } from 'lucide-react';

export default function Home() {
  const { data: units = [], isLoading } = useQuery({
    queryKey: ['/api/units'],
  });
  
  const { data: progressData = [] } = useQuery({
    queryKey: ['/api/progress'],
  });
  
  // Process progress data for easier access
  const progressByUnit = progressData.reduce((acc: Record<number, number>, curr: any) => {
    acc[curr.unitId] = curr.score || 0;
    return acc;
  }, {});
  
  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (units.length === 0) return 0;
    
    const totalProgress = Object.values(progressByUnit).reduce((sum: number, score: number) => sum + score, 0);
    return Math.round(totalProgress / units.length);
  };
  
  const overallProgress = calculateOverallProgress();
  
  // Get unit progress
  const getUnitProgress = (unitId: number) => {
    return progressByUnit[unitId] || 0;
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-heading font-bold text-neutral-800">Cyber Security E-Learning Platform</h1>
        <p className="text-neutral-600 max-w-3xl">
          Welcome to the Cyber Security E-Learning platform. Explore our comprehensive curriculum, covering fundamental
          concepts to advanced techniques in cyber security.
        </p>
      </div>
      
      {/* Overall Progress Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Learning Progress</CardTitle>
          <CardDescription>Track your progress across all units</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Completion</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      {/* Units Grid */}
      <div>
        <h2 className="text-xl font-heading font-bold mb-4">Course Units</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="bg-neutral-50 animate-pulse">
                <CardHeader className="h-32"></CardHeader>
                <CardContent className="h-16"></CardContent>
                <CardFooter className="h-12"></CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit: any) => (
              <Card key={unit.id} className="overflow-hidden">
                <CardHeader className="pb-3 bg-primary bg-opacity-5">
                  <CardTitle className="flex items-start">
                    <BookOpen className="mr-2 h-5 w-5 text-primary shrink-0 mt-1" />
                    <span>{unit.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-4">
                  <p className="text-sm text-neutral-600 mb-3">{unit.description}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{getUnitProgress(unit.id)}%</span>
                    </div>
                    <Progress value={getUnitProgress(unit.id)} className="h-1" />
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href={`/units/${unit.id}`}>
                    <Button className="w-full" variant="outline">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Special Topics */}
      <div>
        <h2 className="text-xl font-heading font-bold mb-4">Special Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3 bg-secondary bg-opacity-5">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-secondary" />
                SQL Injection
              </CardTitle>
              <CardDescription>
                Learn about SQL injection attacks and prevention techniques
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-neutral-600">
                Understand how SQL injection attacks work, their potential impacts, and how to implement effective
                defenses to protect your applications.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/sql-injection">
                <Button className="w-full" variant="outline">
                  Explore Topic
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3 bg-secondary bg-opacity-5">
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-secondary" />
                Cross-Site Scripting (XSS)
              </CardTitle>
              <CardDescription>
                Master XSS attack vectors and security measures
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-neutral-600">
                Explore different types of cross-site scripting vulnerabilities, how attackers exploit them, and
                best practices for writing secure code.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/xss">
                <Button className="w-full" variant="outline">
                  Explore Topic
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
