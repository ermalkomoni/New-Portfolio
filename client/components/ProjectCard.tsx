import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { memo, useMemo, useCallback } from "react";

interface TechBadge {
  name: string;
  color: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: TechBadge[];
  githubUrl?: string;
  liveUrl?: string;
  reversed?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Memoized TechBadge component for better performance
const TechBadge = memo(({ tech }: { tech: TechBadge }) => {
  const badgeStyle = useMemo(() => ({
    backgroundColor: `${tech.color}10`,
    borderColor: `${tech.color}30`,
    color: tech.color
  }), [tech.color]);

  return (
    <span
      className="px-3 py-1 rounded-full text-sm font-medium border"
      style={badgeStyle}
    >
      {tech.name}
    </span>
  );
});

TechBadge.displayName = 'TechBadge';

// Memoized ActionButton component
const ActionButton = memo(({ 
  href, 
  children, 
  icon: Icon, 
  variant = "secondary" 
}: { 
  href: string; 
  children: React.ReactNode; 
  icon: React.ComponentType<{ className?: string }>; 
  variant?: "secondary" | "primary";
}) => {
  const buttonClasses = useMemo(() => {
    const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl";
    
    if (variant === "primary") {
      return cn(
        baseClasses,
        "bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/25 hover:shadow-brand-500/40"
      );
    }
    
    return cn(
      baseClasses,
      "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
    );
  }, [variant]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses}
    >
      <Icon className="w-5 h-5" />
      {children}
    </a>
  );
});

ActionButton.displayName = 'ActionButton';

// Memoized ProjectCard component
const ProjectCard = memo(({ project, index }: ProjectCardProps) => {
  const isReversed = useMemo(() => index % 2 === 1, [index]);

  // Memoize class names to prevent recalculation
  const cardClasses = useMemo(() => cn(
    "relative rounded-2xl border border-border bg-card p-1 shadow-lg transition-all duration-500",
    "hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1"
  ), []);

  const containerClasses = useMemo(() => cn(
    "flex flex-col lg:flex-row items-center gap-8 p-6 lg:p-8",
    isReversed && "lg:flex-row-reverse"
  ), [isReversed]);

  const imageClasses = useMemo(() => cn(
    "w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
  ), []);

  const titleClasses = useMemo(() => cn(
    "text-2xl lg:text-3xl font-bold text-foreground mb-2 group-hover:text-brand-500 transition-colors"
  ), []);

  const descriptionClasses = useMemo(() => cn(
    "text-muted-foreground leading-relaxed text-lg"
  ), []);

  const techStackSectionClasses = useMemo(() => cn(
    "space-y-3"
  ), []);

  const techStackTitleClasses = useMemo(() => cn(
    "text-sm font-semibold text-foreground uppercase tracking-wider"
  ), []);

  const techStackContainerClasses = useMemo(() => cn(
    "flex flex-wrap gap-2"
  ), []);

  const actionButtonsClasses = useMemo(() => cn(
    "flex gap-4 pt-2"
  ), []);

  const glowEffectClasses = useMemo(() => cn(
    "absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-500/5 via-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
  ), []);

  const imageOverlayClasses = useMemo(() => cn(
    "absolute inset-0 bg-brand-500/20 rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center"
  ), []);

  const imageOverlayTextClasses = useMemo(() => cn(
    "text-white font-medium text-lg"
  ), []);

  const gradientLineClasses = useMemo(() => cn(
    "h-1 w-20 bg-gradient-to-r from-brand-500 to-brand-300 rounded-full"
  ), []);

  // Memoize tech stack rendering
  const techStackElements = useMemo(() => 
    project.techStack.map((tech) => (
      <TechBadge key={tech.name} tech={tech} />
    )), [project.techStack]
  );

  // Memoize action buttons
  const actionButtons = useMemo(() => (
    <div className={actionButtonsClasses}>
      {project.githubUrl && (
        <ActionButton
          href={project.githubUrl}
          icon={Github}
          variant="secondary"
        >
          Code
        </ActionButton>
      )}
      {project.liveUrl && (
        <ActionButton
          href={project.liveUrl}
          icon={ExternalLink}
          variant="primary"
        >
          Live Demo
        </ActionButton>
      )}
    </div>
  ), [project.githubUrl, project.liveUrl, actionButtonsClasses]);

  return (
    <div className="group relative">
      {/* Card Container */}
      <div className={cardClasses}>
        {/* Inner Card */}
        <div className="rounded-xl bg-background overflow-hidden">
          <div className={containerClasses}>
            {/* Project Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative group/image">
                <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={imageClasses}
                    loading="lazy"
                  />
                </div>
                {/* Image overlay on hover */}
                <div className={imageOverlayClasses}>
                  <div className={imageOverlayTextClasses}>View Project</div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              {/* Title */}
              <div>
                <h3 className={titleClasses}>
                  {project.title}
                </h3>
                <div className={gradientLineClasses}></div>
              </div>

              {/* Description */}
              <p className={descriptionClasses}>
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className={techStackSectionClasses}>
                <h4 className={techStackTitleClasses}>
                  Tech Stack
                </h4>
                <div className={techStackContainerClasses}>
                  {techStackElements}
                </div>
              </div>

              {/* Action Buttons */}
              {actionButtons}
            </div>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className={glowEffectClasses}></div>
      </div>
    </div>
  );
});

export default ProjectCard;