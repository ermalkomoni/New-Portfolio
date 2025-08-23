import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll-based visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <nav className="flex justify-center items-center py-6">
        {/* Centered Navigation Container with Glass Effect */}
        <div className="flex items-center space-x-8 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-brand-500 relative",
                activeSection === item.href
                  ? "text-brand-500"
                  : "text-white/80 hover:text-white"
              )}
            >
              {item.name}
              {/* Active indicator */}
              {activeSection === item.href && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
