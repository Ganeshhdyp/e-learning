import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface AuthCheckProps {
  children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Query to check if the user is authenticated
  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
    // If 401, return null so we know the user is not authenticated
    queryFn: async ({ queryKey }) => {
      try {
        const response = await fetch(queryKey[0]);
        
        // For development/demo: simulate authentication by considering 
        // any non-401 response as authenticated
        if (response.status !== 401) {
          return { authenticated: true };
        }
        return null;
      } catch (error) {
        return null;
      }
    }
  });
  
  useEffect(() => {
    // If query is done loading and there's no user, they're not authenticated
    if (!isLoading) {
      setIsAuthenticated(!!user);
    }
  }, [user, isLoading]);
  
  // While checking auth status, show loading
  if (isLoading || isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="space-y-6 p-8 max-w-xl mx-auto mt-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Restricted</AlertTitle>
          <AlertDescription>
            This content is only available to registered users. Please log in or create an account to continue.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          
          <Button
            onClick={() => navigate('/register')}
          >
            Create Account
          </Button>
        </div>
      </div>
    );
  }
  
  // If authenticated, render children
  return <>{children}</>;
}