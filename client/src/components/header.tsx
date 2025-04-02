import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  User, 
  LogOut, 
  UserPlus, 
  LogIn, 
  Info, 
  Menu, 
  Book, 
  Shield, 
  ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useLocation();
  
  // Calculate overall progress from all units
  // In a real app, this would come from the user's actual progress data
  const overallProgress = 25; // Mock 25% progress
  
  // For demo purposes, let's assume the user is not logged in
  const isLoggedIn = false;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
    
    // For now, just clear the search field
    setSearchQuery('');
  };
  
  return (
    <header className="fixed w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="mr-4 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 
            className="text-xl font-heading font-bold cursor-pointer flex items-center" 
            onClick={() => setLocation('/')}
          >
            <Shield className="mr-2 h-6 w-6" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 font-bold">
              Cyber Security E-Learning
            </span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              className="text-white text-sm hover:bg-white/10"
              onClick={() => setLocation('/about')}
            >
              <Info className="h-4 w-4 mr-1" />
              About Author
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white text-sm hover:bg-white/10">
                  <Shield className="h-4 w-4 mr-1" />
                  Practice Labs
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => setLocation('/sql-injection')}>
                  SQL Injection Lab
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/xss')}>
                  XSS Attack Lab
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          
          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 rounded-full text-sm bg-white bg-opacity-10 text-white placeholder:text-white placeholder:opacity-70 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 focus:bg-opacity-20"
            />
            <button 
              type="submit"
              className="absolute right-3 top-2.5"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
          
          {/* Progress Overview */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center">
              <span className="text-sm mr-2">Progress:</span>
              <div className="w-24 h-2 bg-white bg-opacity-20 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <span className="text-xs ml-1">{overallProgress}%</span>
            </div>
          )}
          
          {/* Profile Menu */}
          <div className="relative">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-8 w-8 p-0 bg-white/20 flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Book className="mr-2 h-4 w-4" />
                    My Courses
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setLocation('/login')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  className="hidden md:flex items-center text-sm text-white hover:bg-white/10"
                  onClick={() => setLocation('/login')}
                >
                  <LogIn className="mr-1 h-4 w-4" />
                  Login
                </Button>
                <Button 
                  className="bg-white text-blue-700 hover:bg-blue-50 flex items-center text-sm"
                  onClick={() => setLocation('/register')}
                >
                  <UserPlus className="mr-1 h-4 w-4" />
                  <span className="hidden md:block">Register</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
