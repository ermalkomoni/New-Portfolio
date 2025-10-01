import { GraduationCap, Briefcase, Calendar, MapPin } from "lucide-react";
import OptimizedImage from "./ui/optimized-image";
import { motion } from "framer-motion";

const education = [
  {
    institution: "CedX",
    year: "(2020)",
    degree: "Certification in Web Development",
    color: "text-brand-500"
  },
  {
    institution: "Harvard University",
    year: "(2022)",
    degree: "Certification in Introduction to Computer Science",
    color: "text-brand-500"
  },
  {
    institution: "UBT",
    year: "(2020-2024)",
    degree: "Bachelor in Computer Science and Engineering",
    color: "text-brand-500"
  }
];

const workExperience = [
  {
    company: "SPINP Agency",
    period: "(2023-2024)",
    position: "Software Developer",
    color: "text-brand-500"
  },
  {
    company: "SWISS GRC",
    period: "(2024-Present)",
    position: "Solution Engineer",
    color: "text-brand-500"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* about-col-1 - Image */}
          <motion.div 
            className="w-full lg:w-[35%] lg:flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-[355px] h-[512px] lg:w-full lg:h-full rounded-2xl overflow-hidden shadow-lg mx-auto lg:mx-0">
              <OptimizedImage
                src="/portofolioimage.jpg"
                alt="About Photo"
                className="w-full h-full"
                objectFit="cover"
                priority={true}
                quality={85}
                sizes="(max-width: 1024px) 355px, 400px"
                showLoadingSpinner={true}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </motion.div>

          {/* about-col-2 - Content */}
          <div className="w-full lg:w-[60%] lg:flex-grow">
            <div className="space-y-6 lg:space-y-12">
              <div>
                {/* H2 with fadeInUp animation - delay 0.3s */}
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  About Me
                </motion.h2>
                
                {/* Paragraph with fadeInUp animation - delay 0.4s */}
                <motion.p 
                  className="text-base text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Experienced Software Engineer with expertise in developing scalable 
                  applications using C# / .NET Core, Java, MSSQL and React JS. Proven 
                  ability to collaborate with cross-functional teams to deliver enterprise-level 
                  solutions, passionate about creating innovative solutions and delivering 
                  exceptional user experiences. Constantly exploring new technologies and 
                  committed to excellence.
                </motion.p>
              </div>

            {/* Education Section */}
            <div>
            <motion.div 
                  className="flex items-center gap-2 mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="p-1.5 bg-brand-500/10 rounded-md">
                    <GraduationCap className="w-5 h-5 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Education</h3>
              </motion.div>
              <div className="space-y-3">
                  {education.map((edu, index) => (
                    <motion.div 
                      key={index}
                      className="p-3 rounded-lg bg-card border border-border"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.5 + (index * 0.1) // 0.5s, 0.6s, 0.7s delays
                      }}
                      viewport={{ once: true }}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-semibold text-sm ${edu.color}`}>
                            {edu.institution}
                          </h4>
                          <span className="text-muted-foreground text-xs">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">{edu.degree}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
