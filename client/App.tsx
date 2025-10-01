import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import Header from "./components/Header";
import Index from "./pages/Index";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SmoothScrollProvider options={smoothScrollOptions}>
        <Toaster />
        <Sonner />
        <div className="min-h-screen w-full">
          <Header />
          <Index />
        </div>
      </SmoothScrollProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
