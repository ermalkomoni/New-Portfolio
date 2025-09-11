import { GraduationCap, Briefcase, Calendar, MapPin } from "lucide-react";
import portfolioImage from "../images/portofolioimage.jpg";

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
          <div className="w-full lg:w-[35%] lg:flex-shrink-0">
            <div className="w-[355px] h-[512px] lg:w-full lg:h-full rounded-2xl overflow-hidden shadow-lg mx-auto lg:mx-0">
              <img
                src="/portofolioimage.jpg"
                alt="About Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* about-col-2 - Content */}
          <div className="w-full lg:w-[60%] lg:flex-grow">
            <div className="space-y-6 lg:space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                About Me
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Experienced Software Engineer with expertise in developing scalable 
                applications using C# / .NET Core, Java, MSSQL and React JS. Proven 
                ability to collaborate with cross-functional teams to deliver enterprise-level 
                solutions, passionate about creating innovative solutions and delivering 
                exceptional user experiences. Constantly exploring new technologies and 
                committed to excellence.
              </p>
            </div>

            {/* Education Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-brand-500/10 rounded-md">
                  <GraduationCap className="w-5 h-5 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Education</h3>
              </div>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-card border border-border"
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
                  </div>
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
