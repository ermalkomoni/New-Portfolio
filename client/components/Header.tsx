import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll-based visibility and glass effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      // Add glass effect when scrolling up (when header is visible and scrolled)
      if (currentScrollY > 50 && currentScrollY < lastScrollY) {
        setIsScrolled(true); // Scrolling up with some scroll
      } else if (currentScrollY <= 50) {
        setIsScrolled(false); // At top of page
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
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <nav className="flex justify-center items-center py-4 md:py-6 px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {/* Centered Navigation Container - Glass effect only when scrolled up */}
          <div className={cn(
            "flex items-center space-x-8 lg:space-x-12 px-6 lg:px-8 py-3 rounded-full transition-all duration-300",
            isScrolled 
              ? "backdrop-blur-md border border-white/20 shadow-lg bg-white/5" 
              : ""
          )}>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "text-sm lg:text-base font-medium transition-all duration-300 hover:text-brand-500 relative",
                  activeSection === item.href
                    ? "text-brand-500"
                    : "text-white/90 hover:text-white"
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
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden w-full">
          {/* Mobile Menu Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300",
                isScrolled 
                  ? "backdrop-blur-md border border-white/20 shadow-lg bg-white/5" 
                  : ""
              )}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
              <span className="text-sm font-medium text-white">Menu</span>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 px-4">
              <div className="backdrop-blur-md border border-white/20 shadow-lg bg-white/5 rounded-xl p-4">
                <div className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={cn(
                        "text-left px-4 py-3 rounded-lg font-medium transition-all duration-300",
                        activeSection === item.href
                          ? "text-brand-500 bg-white/10"
                          : "text-white/90 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
