import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Troja Restaurant",
    description: "A cross-platform web application built with .NET MVC that enables users to purchase food, make online reservations, and process payments securely through Stripe.",
    image: "/placeholder.svg",
    techStack: [
      { name: ".NET", color: "#512BD4" },
      { name: "MVC", color: "#0066CC" },
      { name: "C#", color: "#239120" },
      { name: "SQL Server", color: "#CC2927" },
      { name: "Stripe", color: "#635BFF" }
    ],
    githubUrl: "https://github.com/ermalkomoni/troja-restaurant",
    liveUrl: "https://trojarestaurant.azurewebsites.net"
  },
  {
    title: "TrustGuard",
    description: "A cross-platform web app with .NET and React, enabling easy purchase of diverse insurance policies with secure Stripe payments and comprehensive admin management.",
    image: "/placeholder.svg",
    techStack: [
      { name: ".NET", color: "#512BD4" },
      { name: "React JS", color: "#61DAFB" },
      { name: "C#", color: "#239120" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Stripe", color: "#635BFF" }
    ],
    githubUrl: "https://github.com/ermalkomoni/trustguard",
    liveUrl: "https://trustguard-demo.azurewebsites.net"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lg text-brand-500 font-medium mb-2">My Recent</p>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 bg-clip-text text-transparent mb-6">
            Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of my latest work, featuring full-stack applications built with modern technologies 
            and best practices.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16 lg:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 lg:mt-24">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-brand-500/5 to-brand-600/5 border border-brand-500/20">
            <h3 className="text-2xl font-bold text-foreground">
              Interested in working together?
            </h3>
            <p className="text-muted-foreground mb-4">
              Let's discuss your next project and bring your ideas to life.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
