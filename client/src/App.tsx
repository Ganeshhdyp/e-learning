import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import UnitContent from "@/pages/unit-content";
import AssessmentPage from "@/pages/assessment";
import SqlInjection from "@/pages/sql-injection";
import XSS from "@/pages/xss";
import AboutAuthor from "@/pages/about";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

function Router() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [location] = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Don't show sidebar and header on login and register pages
  const isAuthPage = location === "/login" || location === "/register";

  return (
    <div className="flex h-screen overflow-hidden">
      {!isAuthPage && <Header toggleSidebar={toggleSidebar} />}
      
      <div className="flex flex-1">
        {!isAuthPage && (
          <div className={sidebarOpen ? "block" : "hidden md:block"}>
            <Sidebar isOpen={sidebarOpen} />
          </div>
        )}
        
        <main className={`${isAuthPage ? 'w-full' : 'flex-1'} overflow-y-auto ${isAuthPage ? '' : 'pt-16'} bg-neutral-50`}>
          <div className={`${isAuthPage ? '' : 'px-4 py-6 max-w-6xl mx-auto'}`}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/units/:unitId" component={UnitContent} />
              <Route path="/units/:unitId/assessment" component={AssessmentPage} />
              <Route path="/sql-injection" component={SqlInjection} />
              <Route path="/xss" component={XSS} />
              <Route path="/about" component={AboutAuthor} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
