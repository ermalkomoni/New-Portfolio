import { useState } from "react";
import { Mail, Linkedin, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "ermalkomonidev@gmail.com",
    href: "mailto:ermalkomonidev@gmail.com",
    description: "Drop me a line anytime",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "Connect with me",
    href: "https://linkedin.com/in/ermalkomoni",
    description: "Let's connect professionally",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+383 49 704 880",
    href: "tel:+38349704880",
    description: "Let's have a quick chat",
    color: "from-green-500 to-green-600"
  }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your form submission logic here
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lg text-brand-500 font-medium mb-2">Get in Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 bg-clip-text text-transparent mb-6">
            Contact Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Let's Start a Conversation
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hello, I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : '_self'}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="group block"
                >
                  <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300 hover:scale-[1.02]">
                    {/* Icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
                      method.color
                    )}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-brand-500 transition-colors">
                        {method.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-1">
                        {method.description}
                      </p>
                      <p className="font-medium text-foreground">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability Status */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-brand-500/10 to-brand-600/10 border border-brand-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Currently Available</h4>
                  <p className="text-muted-foreground text-sm">
                    Open for freelance opportunities and full-time positions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-brand-500" />
              <h3 className="text-xl font-bold text-foreground">
                Send a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
