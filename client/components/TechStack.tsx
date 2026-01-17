import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  logo: React.ReactNode;
  description: string;
}

interface TechStackProps {
  title: string;
  technologies: TechItem[];
  direction?: "left" | "right";
}

  // Memoized TechIcon component for performance optimization
  const TechIcon = memo(({ 
    tech, 
    index, 
    isCenter, 
    distanceFromCenter,
    onClick
  }: { 
    tech: TechItem; 
    index: number;
    isCenter: boolean;
    distanceFromCenter: number;
    onClick: () => void;
  }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Memoize expensive calculations to prevent recalculation on every render
  const { scale, opacity, brightness } = useMemo(() => {
    const absDistance = Math.abs(distanceFromCenter);
    return {
      scale: isCenter ? 1.4 : Math.max(0.7, 1 - absDistance * 0.15),
      opacity: isCenter ? 1 : Math.max(0.4, 1 - absDistance * 0.15),
      brightness: isCenter ? 1 : Math.max(0.6, 1 - absDistance * 0.2)
    };
  }, [isCenter, distanceFromCenter]);

  // Memoize style object to prevent object recreation
  const containerStyle = useMemo(() => ({
    transform: `scale(${scale})`,
    opacity: opacity,
    filter: `brightness(${brightness})`,
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
  }), [scale, opacity, brightness]);

  // Memoize event handlers to prevent function recreation
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(() => onClick(), [onClick]);

  // Memoize class names to prevent recalculation
  const containerClasses = useMemo(() => cn(
    "relative w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-200 ease-out",
    "hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-500/20",
    isHovered && "scale-110 -translate-y-2 shadow-2xl shadow-brand-500/20"
  ), [isHovered]);

  const logoContainerClasses = useMemo(() => cn(
    "flex items-center justify-center transition-all duration-200 ease-out",
    isCenter ? "w-12 h-12 md:w-14 md:h-14" : "w-10 h-10 md:w-12 md:h-12"
  ), [isCenter]);

  const glowClasses = useMemo(() => cn(
    "absolute inset-0 rounded-full transition-all duration-200 ease-out pointer-events-none",
    isHovered ? "shadow-2xl shadow-brand-500/30 bg-brand-300/10" : ""
  ), [isHovered]);

  const tooltipClasses = useMemo(() => cn(
    "hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 mt-4 px-3 py-1 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-sm font-medium text-foreground opacity-0 transition-all duration-500 ease-out pointer-events-none whitespace-nowrap z-20",
    isHovered && "opacity-100 translate-y-0",
    !isHovered && "translate-y-2"
  ), [isHovered]);

  return (
    <div 
      className="relative group flex-shrink-0 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={containerStyle}
    >
      {/* Glass effect container */}
      <div className={containerClasses}>
        {/* Glass effect background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 shadow-lg transition-all duration-500 ease-out">
          {/* Logo container */}
          <div className="w-full h-full flex items-center justify-center rounded-full relative z-10">
            <div className={logoContainerClasses}>
              {tech.logo}
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className={glowClasses} />

        {/* Subtle pulse animation for center item */}
        {isCenter && (
          <div className="absolute inset-0 rounded-full border-2 border-brand-500/30 animate-pulse transition-all duration-600 ease-out" />
        )}
      </div>

      {/* Tech name tooltip - hidden on mobile */}
      <div className={tooltipClasses}>
        {tech.name}
      </div>
    </div>
  );
});

const [touchStart, setTouchStart] = useState(0);

const handleTouchStart = (e: React.TouchEvent) => {
  setTouchStart(e.touches[0].clientX);
};

const handleTouchEnd = (e: React.TouchEvent) => {
  const touchEnd = e.changedTouches[0].clientX;
  const diff = touchStart - touchEnd;

  if(Math.abs(diff) > 50) {
    if(diff > 0) shiftRight();
    else shiftLeft();
  }
};

// Set display name for debugging
TechIcon.displayName = 'TechIcon';

// Memoized TechStack component for performance
const TechStack = memo(({ title, technologies, direction = "left" }: TechStackProps) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Always show 9 items, so we need to create a window of 7 items
  const ITEMS_TO_SHOW = 9;
  const baseLength = technologies.length;

  // Initialize centerIndex to the middle of the array
  useEffect(() => {
    setCenterIndex(Math.floor(baseLength / 2));
  }, [baseLength]);

  // Memoize infinite technologies array to prevent recreation on every render
  const infiniteTechnologies = useMemo(() => 
    [...technologies, ...technologies, ...technologies, ...technologies, ...technologies],
    [technologies]
  );
  const totalInfiniteLength = infiniteTechnologies.length;

  const shiftLeft = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCenterIndex(prev => {
      const newIndex = prev - 1;
      if (newIndex < 0) {
        return baseLength - 1;
      }
      return newIndex;
    });
    
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, baseLength]);

  const shiftRight = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCenterIndex(prev => {
      const newIndex = prev + 1;
      if (newIndex >= baseLength) {
        return 0;
      }
      return newIndex;
    });
    
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, baseLength]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        shiftLeft();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        shiftRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shiftLeft, shiftRight]);

  // Handle mouse down/up for dragging state
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setDragStartX(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const diff = e.clientX - dragStartX;

      if (Math.abs(diff) > 50) {   // 🔥 threshold to trigger shift
        if (diff > 0) {
          shiftLeft();   // drag right → move carousel left
        } else {
          shiftRight();  // drag left → move carousel right
        }
        setIsDragging(false); // reset dragging after shift
      }
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDragging, dragStartX, shiftLeft, shiftRight]);

  // Handle wheel scrolling with debouncing - only when dragging
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      if (isDragging) {
        e.preventDefault();
        
        // Clear existing timeout
        clearTimeout(wheelTimeout);
        
        // Debounce wheel events
        wheelTimeout = setTimeout(() => {
          if (e.deltaX > 0 || e.deltaY > 0) {
            shiftRight();
          } else {
            shiftLeft();
          }
        }, 50);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
        clearTimeout(wheelTimeout);
      };
    }
  }, [isDragging, shiftLeft, shiftRight]);

  // Touch swipe handlers for mobile devices
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        shiftRight(); // Swipe left -> move right
      } else {
        shiftLeft(); // Swipe right -> move left
      }
    }
  }, [touchStartX, shiftLeft, shiftRight]);

  // Mouse hover handlers (only for non-mobile)
  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setIsHovered(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) setIsHovered(false);
  }, [isMobile]);

  // Memoize expensive visible items calculation
  const visibleItems = useMemo(() => {
    const startIndex = centerIndex - 4; // Show 4 items to the left
    const items = [];
    
    for (let i = 0; i < ITEMS_TO_SHOW; i++) {
      const actualIndex = (startIndex + i + totalInfiniteLength) % totalInfiniteLength;
      const originalIndex = actualIndex % baseLength;
      items.push({
        tech: infiniteTechnologies[actualIndex],
        originalIndex,
        actualIndex,
        isCenter: originalIndex === centerIndex,
        distanceFromCenter: i - 4 // Distance from center (0 = center, -4 to +4)
      });
    }
    
    return items;
  }, [centerIndex, totalInfiniteLength, baseLength, infiniteTechnologies]);

  return (
    <div className="max-w-8xl mx-auto">
      <div className="flex flex-col items-center space-y-16">
        {/* Title */}
        <div className={cn(
          "flex items-center gap-4",
          direction === "right" ? "flex-row-reverse" : "flex-row"
        )}>
          <h3 className="text-xl md:text-2xl font-bold text-foreground whitespace-nowrap">
            {title}
          </h3>
          <div className="h-px bg-gradient-to-r from-brand-500 to-transparent flex-1 max-w-32"></div>
        </div>

        {/* Tech Icons Carousel - Always Show 7 Items */}
        <div
          ref={containerRef}
          className="w-full overflow-visible touch-pan-y"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex justify-center items-center py-12 px-8">
            {/* Fixed 7-item display with smooth transitions */}
            <div className={cn(
              "flex gap-8 md:gap-12 lg:gap-14 transition-all duration-500 ease-out",
              isTransitioning && "transform scale-130"
            )}>
              {visibleItems.map((item, index) => (
                <div
                  key={`${item.tech.name}-${item.actualIndex}`}
                  className="transition-all duration-600 ease-out"
                  style={{
                    animationDelay: `${index * 40}ms`
                  }}
                >
                  <TechIcon
                    tech={item.tech}
                    index={item.originalIndex}
                    isCenter={item.isCenter}
                    distanceFromCenter={item.distanceFromCenter}
                    onClick={() => {
                      if (item.originalIndex !== centerIndex) {
                        setCenterIndex(item.originalIndex);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TechStack;
