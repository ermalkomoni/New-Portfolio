import "./global.css";

import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import Header from "./components/Header";
import Index from "./pages/Index";
import Preloader from "./components/Preloader";

const queryClient = new QueryClient();

// Smooth scroll configuration
const smoothScrollOptions = {
  frameRate: 150,
  animationTime: 800,
  stepSize: 100,
  pulseAlgorithm: true,
  pulseScale: 4,
  pulseNormalize: 1,
  accelerationDelta: 50,
  accelerationMax: 3,
  keyboardSupport: true,
  arrowScroll: 60,
  fixedBackground: true,
  excluded: ''
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // Simulate loading time and ensure preloader shows for minimum duration
  useEffect(() => {
    const minLoadingTime = 1200; // Reduced from 2s to 1.2s for better perceived performance
    const startTime = Date.now();

    const checkLoadingComplete = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // Check if page is fully loaded
    if (document.readyState === 'complete') {
      checkLoadingComplete();
    } else {
      window.addEventListener('load', checkLoadingComplete);
    }

    return () => {
      window.removeEventListener('load', checkLoadingComplete);
    };
  }, []);

  const handlePreloaderComplete = () => {
    setPreloaderComplete(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothScrollProvider options={smoothScrollOptions}>
          <Sonner />
          {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
          {(!isLoading || preloaderComplete) && (
            <>
              {/* Skip link for accessibility - keyboard users can skip to main content */}
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>
              <div className="min-h-screen w-full">
                <Header />
                <main id="main-content">
                  <Index />
                </main>
              </div>
            </>
          )}
        </SmoothScrollProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);