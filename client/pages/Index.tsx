import { Github, Linkedin, Mail, Download, ArrowRight } from "lucide-react";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

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
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-1">
              <div className="relative">
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-brand-500/20 shadow-2xl shadow-brand-500/20">
                  <img
                    src="/placeholder.svg"
                    alt="Ermal Komoni"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online status indicator */}
                <div className="absolute bottom-8 right-8 w-6 h-6 bg-green-500 rounded-full border-4 border-background shadow-lg"></div>
                
                {/* Floating elements for visual interest */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-brand-400 rounded-full opacity-30 animate-pulse delay-75"></div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground font-medium">
                    Hello, I'm
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 bg-clip-text text-transparent">
                    Ermal Komoni
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                    Software Engineer
                  </p>
                </div>

                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  I build exceptional digital experiences that combine beautiful design 
                  with robust functionality. Passionate about creating solutions that 
                  make a difference.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Info
                  </button>
                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                    <Download className="w-5 h-5" />
                    Preview CV
                  </button>
                </div>

                {/* Social Links */}
                <div className="flex gap-6 justify-center lg:justify-start">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Linkedin className="w-6 h-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Github className="w-6 h-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Quick About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Building the Future, One Line at a Time
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            With expertise in modern web technologies and a passion for clean, 
            efficient code, I help businesses and individuals bring their digital 
            visions to life.
          </p>
          <button
            onClick={() => scrollToSection('about')}
            className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-400 font-medium transition-colors group"
          >
            Learn more about me
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
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
