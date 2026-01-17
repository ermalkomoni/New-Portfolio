import { useState, useRef, useEffect } from "react";
import { Mail, Linkedin, MapPin, Phone, Send, MessageCircle, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ContactFormData, ContactResponse } from "@shared/api";

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
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result: ContactResponse = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-focus the name input when the form comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && nameInputRef.current) {
            // Small delay to ensure smooth animation completion
            setTimeout(() => {
              nameInputRef.current?.focus();
            }, 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    const formElement = document.getElementById('contact-form');
    if (formElement) {
      observer.observe(formElement);
    }

    return () => {
      if (formElement) {
        observer.unobserve(formElement);
      }
    };
  }, []);

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Subtitle with fadeInUp - delay 0.2s */}
          <motion.p 
            className="text-lg text-brand-500 font-medium mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.p>

          {/* Main title with fadeInUp - delay 0.3s */}
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Contact Me
          </motion.h2>

          {/* Description with fadeInUp - delay 0.4s */}
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information - fadeInRight */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Let's Start a Conversation
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hello, I'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Contact Methods with staggered animation */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : '_self'}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="group block"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 // All animate at the same time
                  }}
                  viewport={{ once: true }}
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
                </motion.a>
              ))}
            </div>

            {/* Availability Status */}
            <motion.div 
              className="p-6 rounded-xl bg-gradient-to-br from-brand-500/10 to-brand-600/10 border border-brand-500/20"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Currently Available</h4>
                  <p className="text-muted-foreground text-sm">
                    Open for freelance opportunities and part-time positions
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - fadeInLeft */}
          <motion.div 
            id="contact-form"
            className="bg-card border border-border rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <MessageCircle className="w-6 h-6 text-brand-500" />
              <h3 className="text-xl font-bold text-foreground">
                Send a Message
              </h3>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
              {/* Status Message - with aria-live for screen readers */}
              <div aria-live="polite" aria-atomic="true">
                {submitStatus !== 'idle' && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-4 rounded-lg flex items-center gap-3",
                      submitStatus === 'success' 
                        ? "bg-green-50 border border-green-200 text-green-800" 
                        : "bg-red-50 border border-red-200 text-red-800"
                    )}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" aria-hidden="true" />
                    )}
                    <span className="text-sm font-medium">{submitMessage}</span>
                  </motion.div>
                )}
              </div>
              <motion.div 
                className="grid sm:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
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
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
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
                  aria-required="true"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-medium rounded-lg transition-all duration-300 shadow-lg",
                  isSubmitting 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={!isSubmitting ? { 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
                } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
