import { useState, useEffect, useRef, useCallback } from "react";
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

const TechIcon = ({ 
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

  // Calculate scale and opacity based on distance from center
  // Center item (distance 0) = 1.6x, items get progressively smaller
  const scale = isCenter ? 1.4 : Math.max(0.7, 1 - Math.abs(distanceFromCenter) * 0.15);
  const opacity = isCenter ? 1 : Math.max(0.4, 1 - Math.abs(distanceFromCenter) * 0.15);
  const brightness = isCenter ? 1 : Math.max(0.6, 1 - Math.abs(distanceFromCenter) * 0.2);

  return (
    <div 
      className="relative group flex-shrink-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        filter: `brightness(${brightness})`,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {/* Glass effect container */}
      <div
        className={cn(
          "relative w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-200 ease-out",
          "hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-500/20",
          isHovered && "scale-110 -translate-y-2 shadow-2xl shadow-brand-500/20"
        )}
      >
        {/* Glass effect background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 shadow-lg transition-all duration-500 ease-out">
          {/* Logo container */}
          <div className="w-full h-full flex items-center justify-center rounded-full relative z-10">
            <div className={cn(
              "flex items-center justify-center transition-all duration-200 ease-out",
              isCenter ? "w-12 h-12 md:w-14 md:h-14" : "w-10 h-10 md:w-12 md:h-12"
            )}>
              {tech.logo}
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-200 ease-out pointer-events-none",
            isHovered ? "shadow-2xl shadow-brand-500/30 bg-brand-300/10" : ""
          )}
        />

        {/* Subtle pulse animation for center item */}
        {isCenter && (
          <div className="absolute inset-0 rounded-full border-2 border-brand-500/30 animate-pulse transition-all duration-600 ease-out" />
        )}
      </div>

      {/* Tech name tooltip - hidden on mobile */}
      <div className={cn(
        "hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 mt-4 px-3 py-1 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-sm font-medium text-foreground opacity-0 transition-all duration-500 ease-out pointer-events-none whitespace-nowrap z-20",
        isHovered && "opacity-100 translate-y-0",
        !isHovered && "translate-y-2"
      )}>
        {tech.name}
      </div>
    </div>
  );
};

export default function TechStack({ title, technologies, direction = "left" }: TechStackProps) {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Always show 9 items, so we need to create a window of 7 items
  const ITEMS_TO_SHOW = 9;
  const baseLength = technologies.length;

  // Initialize centerIndex to the middle of the array
  useEffect(() => {
    setCenterIndex(Math.floor(baseLength / 2));
  }, [baseLength]);

  // Create infinite loop array by duplicating the technologies multiple times
  const infiniteTechnologies = [...technologies, ...technologies, ...technologies, ...technologies, ...technologies];
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

  // Calculate which 7 items to show based on centerIndex
  const getVisibleItems = () => {
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
  };

  const visibleItems = getVisibleItems();

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
          className="w-full overflow-visible"
          onMouseEnter={
            window.innerWidth >= 768
              ? () => setIsHovered(true)
              : null
          }
          onMouseLeave={
            window.innerWidth >= 768
              ? () => setIsHovered(false)
              : null
          }
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
}
