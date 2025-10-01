import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Troja Restaurant",
    description: "A cross-platform web application built with .NET MVC that enables users to purchase food, make online reservations, and process payments securely through Stripe.",
    image: "/image.webp",
    techStack: [
      { name: ".NET", color: "#512BD4" },
      { name: "MVC", color: "#0066CC" },
      { name: "C#", color: "#239120" },
      { name: "SQL Server", color: "#CC2927" },
      { name: "Stripe", color: "#635BFF" }
    ],
    githubUrl: "https://github.com/ermalkomoni/RMS",
    liveUrl: "https://trojarestaurant.azurewebsites.net"
  },
  {
    title: "TrustGuard",
    description: "A cross-platform web app with .NET and React, enabling easy purchase of diverse insurance policies with secure Stripe payments and comprehensive admin management.",
    image: "/trustguard.webp",
    techStack: [
      { name: ".NET", color: "#512BD4" },
      { name: "React JS", color: "#61DAFB" },
      { name: "C#", color: "#239120" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Stripe", color: "#635BFF" }
    ],
    githubUrl: "https://github.com/ermalkomoni/TrustGuard-Rebranded"
  },
  {
    title: "SnapSend",
    description: "A cross-platform web app built with .NET and React, enabling users to securely share self-destructing passwords or files through an intuitive interface with customizable expiration times, featuring a futuristic glowing design and strong encryption for maximum privacy.",
    image: "/snapsend.webp",
    techStack: [
      { name: ".NET", color: "#512BD4" },
      { name: "React JS", color: "#0066CC" },
      { name: "C#", color: "#239120" }
    ],
    githubUrl: "https://github.com/ermalkomoni/troja-restaurant",
  },
  {
    title: "Sales Management System",
    description: "A .NET and React JS app for efficient sales management, including product, sales, and invoice management with real-time information.",
    image: "/salessystem.webp",
    techStack: [
      { name: ".NET", color: "#512BD4" },
      { name: "React JS", color: "#61DAFB" }
    ],
    githubUrl: "https://github.com/Bleronn/SMS",
  },
  {
    title: "Modern Retail Marketplace",
    description: "An interactive retail website, inspired by Nike. It offers a modern and captivating user interface, easy navigation, and an extensive selection of athletic products.",
    image: "/ecommerce-project.webp",
    techStack: [
      { name: "HTML", color: "#512BD4" },
      { name: "CSS", color: "#0066CC" },
      { name: "JavaScript", color: "#239120" },
      { name: "PixiJS", color: "#0066CC" }
    ],
    githubUrl: "https://github.com/ermalkomoni/Modern-Retail-Marketplace",
    liveUrl: "https://retail-marketplace.netlify.app/"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Subtitle with fadeInUp - delay 0.2s */}
          <motion.p 
            className="text-base sm:text-lg text-brand-500 font-medium mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My Recent
          </motion.p>

          {/* Main title with enhanced fade and scale effect */}
          <motion.h2 
            className="h-auto text-3xl sm:text-4xl md:text-5xl font-bold 
                      bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 
                      bg-clip-text text-transparent mb-4 sm:mb-6 pb-2"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            Projects
          </motion.h2>

          {/* Description with fadeInUp - delay 0.4s */}
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A showcase of my latest work, featuring full-stack applications built with modern technologies 
            and best practices.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16 lg:space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.1 + (index * 0.15), // Smoother staggered delays
                type: "spring",
                stiffness: 60,
                damping: 20
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.1 }
              }}
            >
              <ProjectCard 
                project={project} 
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action with advanced animations */}
        <motion.div 
          className="text-center mt-16 lg:mt-24"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            type: "spring",
            stiffness: 120
          }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-brand-500/5 to-brand-600/5 border border-brand-500/20 relative overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Subtle animated background for current job effect */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: "linear-gradient(135deg, transparent 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
                width: "200%",
                height: "200%"
              }}
              animate={{
                x: ["-50%", "0%"],
                y: ["-50%", "0%"]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />

            {/* Content with relative positioning */}
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Interested in working together?
              </motion.h3>

              <motion.p 
                className="text-muted-foreground mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Let's discuss your next project and bring your ideas to life.
              </motion.p>

              <motion.button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
