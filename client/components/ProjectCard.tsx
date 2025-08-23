import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isReversed = index % 2 === 1;

  return (
    <div className="group relative">
      {/* Card Container */}
      <div className={cn(
        "relative rounded-2xl border border-border bg-card p-1 shadow-lg transition-all duration-500",
        "hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1"
      )}>
        {/* Inner Card */}
        <div className="rounded-xl bg-background overflow-hidden">
          <div className={cn(
            "flex flex-col lg:flex-row items-center gap-8 p-6 lg:p-8",
            isReversed && "lg:flex-row-reverse"
          )}>
            {/* Project Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative group/image">
                <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                  />
                </div>
                {/* Image overlay on hover */}
                <div className="absolute inset-0 bg-brand-500/20 rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white font-medium text-lg">View Project</div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              {/* Title */}
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 group-hover:text-brand-500 transition-colors">
                  {project.title}
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-brand-500 to-brand-300 rounded-full"></div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-lg">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-3 py-1 rounded-full text-sm font-medium border"
                      style={{
                        backgroundColor: `${tech.color}10`,
                        borderColor: `${tech.color}30`,
                        color: tech.color
                      }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Github className="w-5 h-5" />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-500/5 via-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
}
