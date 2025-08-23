import { useState } from "react";
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

const TechIcon = ({ tech, index }: { tech: TechItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <div 
        className={cn(
          "absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-background border border-border rounded-lg shadow-lg z-10 whitespace-nowrap transition-all duration-300",
          isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        )}
      >
        <div className="text-sm font-medium text-foreground">{tech.name}</div>
        <div className="text-xs text-muted-foreground">{tech.description}</div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-border"></div>
      </div>

      {/* Tech Icon with circular design and border fade */}
      <div
        className={cn(
          "tech-icon tech-item relative w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-500 cursor-pointer",
          "hover:scale-110 hover:-translate-y-2",
          isHovered && "scale-110 -translate-y-2"
        )}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Outer ring with subtle border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 p-[2px]">
          {/* Inner circle with white background */}
          <div className="w-full h-full rounded-full bg-white shadow-lg">
            {/* Inner border fade effect */}
            <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-white via-neutral-50/50 to-white shadow-inner">
              {/* Logo container */}
              <div className="w-full h-full flex items-center justify-center rounded-full">
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                  {tech.logo}
                </div>
              </div>
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
  return (
    <div className="flex flex-col items-center space-y-8">
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

      {/* Tech Icons Grid */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-md">
        {technologies.map((tech, index) => (
          <TechIcon key={tech.name} tech={tech} index={index} />
        ))}
      </div>
    </div>
  );
}
