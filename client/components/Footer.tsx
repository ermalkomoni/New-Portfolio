import { Github, Linkedin, Mail } from "lucide-react";
import { navigationItems, socialLinks as socialLinksConfig } from "@/config/navigation";

// Map icon names to Lucide components
const iconMap = {
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
} as const;

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              Ermal Komoni
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Software Engineer passionate about creating innovative solutions 
              and delivering exceptional digital experiences.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinksConfig.map((social) => {
                const IconComponent = iconMap[social.iconName];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-muted-foreground hover:text-brand-500 transition-colors font-medium"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:ermalkomonidev@gmail.com"
                className="block text-muted-foreground hover:text-brand-500 transition-colors"
              >
                ermalkomonidev@gmail.com
              </a>
              <p className="text-muted-foreground">
                Pristina, Kosovo
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for opportunities
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              Copyright © {currentYear} Ermal Komoni. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
