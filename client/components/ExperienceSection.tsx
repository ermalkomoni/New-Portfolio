import { Calendar, MapPin, Building, Briefcase } from "lucide-react";
import TechStack from "./TechStack";
import { motion } from "framer-motion";

const workExperience = [
  {
    company: "SPINP Agency",
    position: "Software Developer",
    period: "June 2023 - June 2024", 
    location: "Kosovo - Onsite",
    description: "Developed and maintained web applications using modern technologies, collaborated with design teams, and implemented responsive user interfaces for client projects.",
    technologies: ["C#", ".NET", "Angular", "JavaScript", "SQL Server", "PostgreSQL"],
    isCurrentJob: false
  },
  {
    company: "SWISS GRC",
    position: "Solution Engineer",
    period: "July 2024 - Present",
    location: "Switzerland - Remote",
    description: "Leading solution engineering initiatives, developing enterprise-level applications, and collaborating with cross-functional teams to deliver innovative software solutions.",
    technologies: ["C#", ".NET", "Azure", "JavaScript", "React JS", "SQL Server", "SharePoint"],
    isCurrentJob: true
  }
];

const backendTech = [
  {
    name: "SignalR",
    logo: (
      <img
        src="/SignalR.webp" 
        alt="SignalR Logo" 
        className="w-full h-full"
      />
    ),
    description: "SignalR"
  },
  {
    name: "HTML5",
    logo: (
      <img
        src="/html.webp" 
        alt="HTML Logo" 
        className="w-full h-full"
      />
    ),
    description: "Markup language"
  },
  {
    name: "CSS3",
    logo: (
      <img
        src="/css.webp" 
        alt="CSS Logo" 
        className="w-full h-full"
      />
    ),
    description: "Styling & animations"
  },
  {
    name: "PHP",
    logo: (
      <img
        src="/php.webp" 
        alt="PHP Logo" 
        className="w-full h-full"
      />
    ),
    description: "Server-side scripting"
  },
  {
    name: "Java",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path fill="#ED8B00" d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
      </svg>
    ),
    description: "Enterprise applications"
  },
  {
    name: "C#",
    logo: (
      <img
        src="/csharp.webp" 
        alt="C# Logo" 
        className="w-full h-full"
      />
    ),
    description: "Object-oriented programming"
  },
  {
    name: ".NET",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="dotnetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#7B68EE', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#512BD4', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#3A1F9E', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        
        <path 
          d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L4.78 9.863a2.896 2.896 0 0 1-.258-.51h-.036c.032.189.048.592.048 1.21v5.772H3.157V7.53h1.659l3.965 6.32c.167.261.275.442.323.54h.024c-.04-.233-.06-.629-.06-1.185V7.529h1.372zm-8.703-.693a.868.868 0 0 1-.869.693.877.877 0 0 1-.868-.693.876.876 0 0 1 .868-.692.868.868 0 0 1 .869.692Z" 
          fill="url(#dotnetGradient)"
          filter="url(#shadow)"
        />
        
        <path 
          d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L4.78 9.863a2.896 2.896 0 0 1-.258-.51h-.036c.032.189.048.592.048 1.21v5.772H3.157V7.53h1.659l3.965 6.32c.167.261.275.442.323.54h.024c-.04-.233-.06-.629-.06-1.185V7.529h1.372zm-8.703-.693a.868.868 0 0 1-.869.693.877.877 0 0 1-.868-.693.876.876 0 0 1 .868-.692.868.868 0 0 1 .869.692Z" 
          fill="none"
          stroke="#B8A9FF"
          strokeWidth="0.2"
          opacity="0.9"
        />
      </svg>
    ),
    description: "Microsoft .NET Framework"
  },
  {
    name: "React JS",
    logo: (
      <img
        src="/react.webp" 
        alt="React JS Logo" 
        className="w-full h-full"
      />
    ),
    description: "Microsoft database"
  },
  {
    name: "Angular",
    logo: (
      <img
        src="/angular.webp" 
        alt="Angular Logo" 
      />
    ),
    description: "Angular"
  },
  {
    name: "SQL Server",
    logo: (
      <img
        src="/sqlserver.webp" 
        alt="SQL Server Logo" 
        className="w-full h-full"
      />
    ),
    description: "Microsoft database"
  },
  {
    name: "PostgreSQL",
    logo: (
      <img
        src="/postgresql.webp" 
        alt="PostgreSQL Logo" 
        className="w-full h-full"
      />
    ),
    description: "PostgreSQL database"
  },
  {
    name: "Kubernets",
    logo: (
      <img
        src="/kubernets.webp" 
        alt="Kubernetes Logo" 
        className="w-full h-full"
      />
    ),
    description: "Kubernets"
  },
  {
    name: "RabbitMQ",
    logo: (
      <img
        src="/RabbitMQ.webp" 
        alt="RabbitMQ Logo" 
        className="w-full h-full"
      />
    ),
    description: "RabbitMQ"
  }
];

// const frontendTech = [
//   {
//     name: "HTML5",
//     logo: (
//       <svg viewBox="0 0 24 24" className="w-full h-full">
//         <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
//       </svg>
//     ),
//     description: "Markup language"
//   },
//   {
//     name: "CSS3",
//     logo: (
//       <svg viewBox="0 0 24 24" className="w-full h-full">
//         <path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
//       </svg>
//     ),
//     description: "Styling & animations"
//   },
//   {
//     name: "JavaScript",
//     logo: (
//       <svg viewBox="0 0 24 24" className="w-full h-full">
//         <path fill="#F7DF1E" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
//       </svg>
//     ),
//     description: "Dynamic programming"
//   },
//   {
//     name: "React",
//     logo: (
//       <svg viewBox="0 0 24 24" className="w-full h-full">
//         <path fill="#61DAFB" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.563-.455-.468-.91-.991-1.36-1.563z"/>
//       </svg>
//     ),
//     description: "UI component library"
//   }
// ];

// const databaseTech = [
//   {
//     name: "SQL Server",
//     logo: (
//       <svg viewBox="0 0 24 24" className="w-full h-full">
//         <path fill="#CC2927" d="M8.53 15.976h-.14c-1.199 0-2.265-.456-2.924-1.186-.66-.731-1.042-1.72-1.042-2.79s.383-2.059 1.042-2.79c.66-.731 1.725-1.186 2.924-1.186h.14c1.199 0 2.265.455 2.924 1.186.66.731 1.042 1.72 1.042 2.79s-.383 2.059-1.042 2.79c-.66.73-1.725 1.186-2.924 1.186zm7.058-7.952h-.14c-1.199 0-2.265.455-2.924 1.186-.66.731-1.042 1.72-1.042 2.79s.383 2.059 1.042 2.79c.66.731 1.725 1.186 2.924 1.186h.14c1.199 0 2.265-.455 2.924-1.186.66-.731 1.042-1.72 1.042-2.79s-.383-2.059-1.042-2.79c-.66-.731-1.725-1.186-2.924-1.186zM5.18 10.015H1.946v1.97H5.18c.544 0 .985-.441.985-.985s-.441-.985-.985-.985z"/>
//       </svg>
//     ),
//     description: "Microsoft database"
//   },
//   {
//     name: "MongoDB",
//     logo: (
//       <svg viewBox="0 0 24 24" className="w-full h-full">
//         <path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
//       </svg>
//     ),
//     description: "NoSQL database"
//   }
// ];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Subtitle with fadeInUp - delay 0.2s */}
          <motion.p 
            className="text-base sm:text-lg text-brand-500 font-medium mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore My
          </motion.p>

          {/* Main title with fadeInUp - delay 0.3s */}
          <motion.h2 
            className="h-auto text-3xl sm:text-4xl md:text-5xl font-bold 
                bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 
                bg-clip-text text-transparent mb-4 sm:mb-6 pb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>

          {/* Description with fadeInUp - delay 0.4s */}
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A journey through my professional experience and the technologies I've mastered along the way.
          </motion.p>
        </div>

        {/* Work Experience Timeline */}
        <div className="mb-16 sm:mb-20">
          {/* Section title with fadeInUp - delay 0.5s */}
          <motion.h3 
            className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Professional Journey
          </motion.h3>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line - animated with scaleY */}
            <motion.div 
              className="absolute left-4 sm:left-8 top-8 sm:top-10 w-0.5 h-[calc(2*160px)] sm:h-[calc(2*150px)] bg-gradient-to-b from-brand-500 to-brand-0"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              viewport={{ once: true }}
            ></motion.div>
            
            <div className="space-y-8 sm:space-y-12">
              {workExperience.map((job, index) => (
                <motion.div 
                  key={index} className="relative flex items-start gap-4 sm:gap-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.7 + (index * 0.1)
                  }}
                  viewport={{ once: true }}
                >
                  {/* Timeline dot with pulsing animation for current job */}
                  <motion.div 
                    className={`relative z-10 w-8 h-8 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg ${
                      job.isCurrentJob 
                        ? 'bg-brand-500' 
                        : 'bg-secondary border-2 border-brand-500'
                    }`}
                    animate={job.isCurrentJob ? {
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.7)",
                        "0 0 0 10px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0)"
                      ]
                    } : {}}
                    transition={job.isCurrentJob ? {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "loop"
                    } : {}}
                  >
                    <Briefcase className={`w-4 h-4 sm:w-8 sm:h-8 ${
                      job.isCurrentJob ? 'text-white' : 'text-brand-500'
                    }`} />
                  </motion.div>

                  {/* Job Details Card with enhanced spotlight effect for current job */}
                  <motion.div 
                    className={`flex-1 border border-border rounded-xl p-4 sm:p-6 shadow-lg transition-all duration-300 overflow-hidden relative ${
                      job.isCurrentJob 
                        ? 'bg-gradient-to-br from-brand-500/10 via-brand-400/5 to-brand-600/10 border-brand-500/50' 
                        : 'bg-card border-border'
                    } hover:scale-[1.02]`}
                    whileHover={job.isCurrentJob ? { 
                      boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)" 
                    } : {
                      boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                  >

                    {/* Content with relative positioning */}
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-foreground mb-1">{job.position}</h4>
                          <div className="flex items-center gap-2 text-brand-500 font-semibold mb-2">
                            <Building className="w-4 h-4" />
                            {job.company}
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {job.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">
                        {job.description}
                      </p>
                      
                      {/* Technologies used */}
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 sm:px-3 py-1 bg-brand-500/10 text-brand-500 rounded-full text-xs sm:text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <motion.div 
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <TechStack 
            title="Technology Stack"
            technologies={[...backendTech]}
          />
        </motion.div>
      </div>
    </section>
  );
}
