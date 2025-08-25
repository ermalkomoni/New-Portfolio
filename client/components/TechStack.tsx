import { useState, useEffect, useRef } from "react";
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
  distanceFromCenter 
}: { 
  tech: TechItem; 
  index: number;
  isCenter: boolean;
  distanceFromCenter: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate scale and opacity based on distance from center with more eased fading
  const scale = isCenter ? 1.4 : Math.max(0.85, 1 - Math.abs(distanceFromCenter) * 0.08);
  const opacity = isCenter ? 1 : Math.max(0.6, 1 - Math.abs(distanceFromCenter) * 0.10);
  const brightness = isCenter ? 1 : Math.max(0.8, 1 - Math.abs(distanceFromCenter) * 0.1);

  return (
    <div 
      className="relative group flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        filter: `brightness(${brightness})`,
        transition: "all 0.3s ease-out"
      }}
    >
      {/* Glass effect container */}
      <div
        className={cn(
          "relative w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-300 cursor-pointer",
          "hover:scale-110 hover:-translate-y-2",
          isHovered && "scale-110 -translate-y-2"
        )}
      >
        {/* Glass effect background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 shadow-lg">
          {/* Logo container */}
          <div className="w-full h-full flex items-center justify-center rounded-full relative z-10">
            <div className={cn(
              "flex items-center justify-center transition-all duration-300",
              isCenter ? "w-12 h-12 md:w-14 md:h-14" : "w-10 h-10 md:w-12 md:h-12"
            )}>
              {tech.logo}
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-300 pointer-events-none",
            isHovered ? "shadow-2xl shadow-brand-500/20 bg-brand-500/5" : ""
          )}
        />
      </div>

      {/* Ripple effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full border-2 transition-all duration-700",
          isHovered ? "scale-150 opacity-0 border-brand-500/30" : "scale-100 opacity-0"
        )}
      />
    </div>
  );
};

export default function TechStack({ title, technologies, direction = "left" }: TechStackProps) {
  const [centerIndex, setCenterIndex] = useState(Math.floor(technologies.length / 2));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Handle scroll-based animations with center-based logic
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const containerWidth = scrollContainerRef.current.clientWidth;
        const itemWidth = 140; // Width of each item with gap
        const paddingWidth = 160; // Width of padding on each side
        
        // Calculate which item should be centered
        const adjustedScrollLeft = scrollLeft - paddingWidth;
        const newCenterIndex = Math.round(adjustedScrollLeft / itemWidth);
        
        // Ensure center index stays within bounds
        const clampedIndex = Math.max(0, Math.min(technologies.length - 1, newCenterIndex));
        
        if (clampedIndex !== centerIndex) {
          setCenterIndex(clampedIndex);
          setIsScrolling(true);
          
          // Reset scrolling state after animation
          setTimeout(() => setIsScrolling(false), 300);
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [technologies.length, centerIndex]);

  // Auto-scroll to center item when centerIndex changes
  useEffect(() => {
    if (scrollContainerRef.current && !isScrolling) {
      const itemWidth = 140;
      const paddingWidth = 160;
      const targetScrollLeft = centerIndex * itemWidth + paddingWidth;
      
      scrollContainerRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }, [centerIndex, isScrolling]);

  return (
    <div className="max-w-7xl mx-auto">
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

        {/* Tech Icons - Center-based scrollable container */}
        <div className="w-full overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 md:gap-12 lg:gap-16 py-12 overflow-x-auto scrollbar-hide"
            style={{
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory'
            }}
          >
            {/* Add padding for centering */}
            <div className="flex-shrink-0 w-40 md:w-48 lg:w-56"></div>
            
            {technologies.map((tech, index) => {
              const distanceFromCenter = index - centerIndex;
              return (
                <div 
                  key={tech.name}
                  className="flex-shrink-0 scroll-snap-center"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <TechIcon 
                    tech={tech} 
                    index={index}
                    isCenter={index === centerIndex}
                    distanceFromCenter={distanceFromCenter}
                  />
                </div>
              );
            })}
            
            {/* Add padding for centering */}
            <div className="flex-shrink-0 w-40 md:w-48 lg:w-56"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
