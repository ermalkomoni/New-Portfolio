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
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-1">
              <div className="relative">
                <div className="w-80 h-80 md:w-86 md:h-86 rounded-full overflow-hidden border-4 border-brand-500/20 shadow-2xl shadow-brand-500/20">
                  <img
                    src="/Cropimageproject.jpeg"
                    alt="Ermal Komoni"
                    className="max-w-full object-[50%_20%] rounded-full"
                  />
                </div>

                {/* Online status indicator */}
                <div className="absolute bottom-10 right-10 sm:bottom-8 sm:right-5 md:bottom-10 md:right-6 lg:bottom-12 lg:right-8">
                  <span className="relative flex h-5 w-5 sm:h-8 sm:w-5 md:h-6 md:w-6 lg:h-5 lg:w-5">
                    {/* Ping animation */}
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-[ping_2s_linear_infinite]"></span>
                    {/* Solid dot */}
                    <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-lg font-medium text-center">
                    Hello, I'm
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 bg-clip-text text-transparent text-center">
                    Ermal Komoni
                  </h1>
                  <p className="text-xl md:text-2xl font-medium text-center">
                    Software Engineer
                  </p>
                </div>

                {/* <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  I build exceptional digital experiences that combine beautiful
                  design with robust functionality. Passionate about creating
                  solutions that make a difference.
                </p> */}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                    <Mail className="w-5 h-5" />
                    Contact Info
                  </button>
                  <button
                    onClick={() => {
                      // Open PDF in new tab
                      window.open('/Ermal_Komoni_Resume.pdf', '_blank');
                    }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    Preview CV
                  </button>
                </div>

                {/* Social Links */}
                <div className="flex gap-6 justify-center">
                  <a
                    href="https://github.com/ermalkomoni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Linkedin className="w-6 h-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/ermalkomoni"
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
      </section>

      {/* Quick About Section */}
      <section className="py-15 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Building the Future, One Line at a Time
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
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
