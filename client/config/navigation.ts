// Shared navigation configuration
// Centralized navigation items used across Header and Footer components

export const navigationItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ermalkomoni",
    iconName: "linkedin" as const,
  },
  {
    name: "GitHub",
    href: "https://github.com/ermalkomoni",
    iconName: "github" as const,
  },
  {
    name: "Email",
    href: "mailto:ermalkomonidev@gmail.com",
    iconName: "mail" as const,
  },
] as const;

export type NavigationItem = (typeof navigationItems)[number];
export type SocialLink = (typeof socialLinks)[number];

