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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-96 h-96 lg:w-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-border shadow-2xl shadow-brand-500/10">
                <img
                  // src={portfolioImage}
                  src="/portofolioimage.jpg"
                  alt="Ermal Komoni - About"
                  className="w-full h-full object-center"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
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
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-brand-500/10 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Education</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h4 className={`font-semibold ${edu.color}`}>
                        {edu.institution}
                      </h4>
                      <span className="text-muted-foreground text-sm">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience Section */}
            {/* <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-brand-500/10 rounded-lg">
                  <Briefcase className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Work Experience</h3>
              </div>
              <div className="space-y-4">
                {workExperience.map((work, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h4 className={`font-semibold ${work.color}`}>
                        {work.company}
                      </h4>
                      <span className="text-muted-foreground text-sm">
                        {work.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1">{work.position}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
