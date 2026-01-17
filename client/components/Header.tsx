import { cn } from "@/lib/utils";
import { useState, useEffect, memo, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { SmoothScrollLink } from "./SmoothScrollLink";
import { useSmoothScrollTo } from "./SmoothScrollLink";
import { navigationItems } from "@/config/navigation";

// Throttle utility for performance
const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const lastCall = useRef(0);
  const lastCallbackRef = useRef(callback);
  
  // Update callback ref when callback changes
  useEffect(() => {
    lastCallbackRef.current = callback;
  }, [callback]);
  
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      lastCallbackRef.current(...args);
    }
  }, [delay]) as T;
};

const Header = memo(function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverWhiteBackground, setIsOverWhiteBackground] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTo = useSmoothScrollTo();

  // Memoized background color checker
  const checkBackgroundColor = useCallback(() => {
    const headerElement = document.querySelector('header');
    if (headerElement) {
      const rect = headerElement.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      
      // Get element at header center position
      const elementAtCenter = document.elementFromPoint(window.innerWidth / 2, centerY);
      if (elementAtCenter) {
        const computedStyle = window.getComputedStyle(elementAtCenter);
        const backgroundColor = computedStyle.backgroundColor;
        
        // Check if background is white/light
        const isLight = backgroundColor.includes('rgb(255, 255, 255)') || 
                       backgroundColor.includes('rgb(248, 250, 252)') || // slate-50
                       backgroundColor.includes('rgb(241, 245, 249)') || // slate-100
                       backgroundColor.includes('rgb(226, 232, 240)');   // slate-200
        
        setIsOverWhiteBackground(isLight);
      }
    }
  }, []);

  // Combined scroll handler for better performance
  const handleScrollRaw = useCallback(() => {
    const currentScrollY = window.scrollY;
    const prevScrollY = lastScrollY.current;
    
    // Show header when scrolling up, hide when scrolling down
    if (currentScrollY > prevScrollY && currentScrollY > 100) {
      setIsVisible(false); // Scrolling down
    } else {
      setIsVisible(true); // Scrolling up
    }
    
    // Add glass effect when scrolling up (when header is visible and scrolled)
    if (currentScrollY > 50 && currentScrollY < prevScrollY) {
      setIsScrolled(true); // Scrolling up with some scroll
    } else if (currentScrollY <= 50) {
      setIsScrolled(false); // At top of page
    }
    
    lastScrollY.current = currentScrollY;
    
    // Check background color (throttled within the scroll handler)
    checkBackgroundColor();
  }, [checkBackgroundColor]);

  // Throttled scroll handler (~60fps)
  const handleScroll = useThrottle(handleScrollRaw, 16);

  // Single consolidated scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkBackgroundColor);
    
    // Initial check
    checkBackgroundColor();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkBackgroundColor);
    };
  }, [handleScroll, checkBackgroundColor]);

  const scrollToSection = useCallback((sectionId: string) => {
    scrollTo(sectionId, 80); // 80px offset for header height
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  }, [scrollTo]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-transparent pt-safe",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <nav className="flex justify-center items-center py-4 md:py-6 px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {/* Centered Navigation Container - Glass effect only when scrolled up */}
          <div className={cn(
            "flex items-center space-x-8 lg:space-x-12 px-6 lg:px-8 py-3 rounded-full transition-all duration-300",
            isScrolled 
              ? "glass-effect shadow-lg" 
              : ""
          )}>
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "text-sm lg:text-base font-medium transition-all duration-300 relative",
                  isOverWhiteBackground 
                    ? "text-neutral-800 hover:text-brand-500" 
                    : "text-white/90 hover:text-brand-500"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden w-full">
          {/* Mobile Menu Button */}
          <div className="flex justify-center">
            <button
              onClick={toggleMobileMenu}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300",
                isScrolled 
                  ? "glass-effect shadow-lg" 
                  : "bg-black/20 border border-white/10"
              )}
            >
              {isMobileMenuOpen ? (
                <X className={cn(
                  "w-5 h-5 transition-colors duration-300",
                  isOverWhiteBackground ? "text-neutral-800" : "text-white"
                )} />
              ) : (
                <Menu className={cn(
                  "w-5 h-5 transition-colors duration-300",
                  isOverWhiteBackground ? "text-neutral-800" : "text-white"
                )} />
              )}
              <span className={cn(
                "text-sm font-medium transition-colors duration-300",
                isOverWhiteBackground ? "text-neutral-800" : "text-white"
              )}>Menu</span>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 px-4">
              <div className="glass-effect shadow-lg rounded-xl p-4">
                <div className="flex flex-col space-y-3">
                  {navigationItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={cn(
                        "text-left px-4 py-3 rounded-lg font-medium transition-all duration-300",
                        isOverWhiteBackground 
                          ? "text-neutral-800 hover:text-brand-500 hover:bg-neutral-100/50" 
                          : "text-white/90 hover:text-brand-500 hover:bg-white/5"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
});

export default Header;
