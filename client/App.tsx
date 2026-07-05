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

  useEffect(() => {
    const minLoadingTime = 1000;
    const startTime = Date.now();

    const decodeImage = (src: string): Promise<void> => {
      const img = new Image();
      img.src = src;
      const waitForDecode = () => img.decode().catch(() => {});
      if (img.complete) return waitForDecode();
      return new Promise((resolve) => {
        img.onload = () => waitForDecode().then(resolve);
        img.onerror = () => resolve();
      });
    };

    const initialize = async () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      await Promise.all([
        new Promise<void>((resolve) => setTimeout(resolve, remainingTime)),
        decodeImage('/Cropimageproject.webp'),
      ]);
      setIsLoading(false);
    };

    initialize();
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