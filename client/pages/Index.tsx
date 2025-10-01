import { Github, Linkedin, Mail, Download, ArrowRight, FileScan } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Index() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="w-full scroll-smooth" 
      style={{
        minHeight: '100dvh'
      }}
    >
      {/* Hero Section */}
      <section
        id="home"
        className="hero-section relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-16 items-center">
            {/* Profile Image - Mobile: Top, Desktop: Left */}
            <motion.div 
              className="flex justify-center lg:justify-end order-1 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="relative ">
                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-brand-500/20 shadow-4xl shadow-brand-500/20 hover:border-[rgb(35,130,246)] transition-all duration-300">
                  <img
                    src="/Cropimageproject.webp"
                    alt="Ermal Komoni"
                  />
                </div>

                {/* Online status indicator */}
                <div className="absolute bottom-6 right-10 sm:bottom-8 sm:right-5 md:bottom-10 md:right-6 lg:bottom-12 lg:right-8">
                  <span className="relative flex h-4 w-4 sm:h-5 sm:w-5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-[ping_2s_linear_infinite]"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Content - Mobile: Below image, Desktop: Right */}
            <div className="text-center lg:text-left order-2 lg:order-2">
              <div className="space-y-6">
                <div className="space-y-3">
                  {/* Greeting text */}
                  <motion.p 
                    className="text-lg text-muted-foreground font-medium text-center font-bold"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }} // Reduced from 0.6s duration & 1.1s delay
                  >
                    Hello, I'm
                  </motion.p>

                  {/* Main title */}
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }} // Reduced from 0.6s duration & 1.2s delay
                  >
                    Ermal Komoni
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p 
                    className="text-xl md:text-2xl text-muted-foreground text-center font-bold"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }} // Reduced from 0.6s duration & 1.4s delay
                  >
                    Software Engineer
                  </motion.p>
                </div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-row gap-4 justify-center"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }} // Reduced from 0.6s duration & 1.5s delay
                >
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Info
                  </button>
                  <ShimmerButton
                    onClick={() => {
                      window.open('/Ermal_Komoni_Resume.pdf', '_blank');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40"
                  >
                    <FileScan className="w-4 h-4" />
                    Preview CV
                  </ShimmerButton>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                  className="flex gap-4 justify-center"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }} // Reduced from 0.6s duration & 1.6s delay
                >
                  <a
                    href="https://linkedin.com/in/ermalkomoni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/ermalkomoni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Github className="w-5 h-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Quick About Section */}
      <section className="py-15 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* H2 with fadeInUp animation - delay 0.3s */}
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Building the Future, One Line at a Time
        </motion.h2>
        
        {/* Paragraph with fadeInUp animation - delay 0.4s */}
        <motion.p 
          className="text-xl text-muted-foreground leading-relaxed mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          With expertise in modern web technologies and a passion for clean, 
          efficient code, I help businesses and individuals bring their digital 
          visions to life.
        </motion.p>
        
        {/* Button with fadeInUp animation - delay 0.5s */}
        <motion.button
          onClick={() => scrollToSection('about')}
          className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-400 font-medium transition-colors group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Learn more about me
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
