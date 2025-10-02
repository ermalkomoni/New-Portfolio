import { RequestHandler } from "express";
import { ContactFormData, ContactResponse } from "@shared/api";

// Simple email fallback that logs to console and can be extended
export const handleEmailFallback: RequestHandler = async (req, res) => {
  try {
    const { name, email, subject, message }: ContactFormData = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      const response: ContactResponse = {
        success: false,
        message: "All fields are required"
      };
      return res.status(400).json(response);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const response: ContactResponse = {
        success: false,
        message: "Please provide a valid email address"
      };
      return res.status(400).json(response);
    }

    // Log the contact form submission
    const contactData = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      source: 'portfolio_contact_form'
    };

    console.log('📧 Contact Form Submission:', JSON.stringify(contactData, null, 2));

    // In production, you could:
    // 1. Save to a database
    // 2. Send to a webhook service
    // 3. Use a service like Formspree, Netlify Forms, or EmailJS
    // 4. Send to a Slack webhook
    // 5. Use a serverless email service like SendGrid, Mailgun, etc.

    const response: ContactResponse = {
      success: true,
      message: "Message received! I'll get back to you soon."
    };

    res.json(response);

  } catch (error) {
    console.error('Contact form error:', error);
    
    const response: ContactResponse = {
      success: false,
      message: "Sorry, there was an error processing your message. Please try again later."
    };
    
    res.status(500).json(response);
  }
};
