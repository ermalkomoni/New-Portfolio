import { RequestHandler } from "express";
import * as nodemailer from "nodemailer";
import { ContactFormData, ContactResponse } from "@shared/api";

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'ermalkomonidev@gmail.com',
      pass: process.env.EMAIL_PASS || process.env.APP_PASSWORD // Use App Password for Gmail
    }
  });
};

export const handleContact: RequestHandler = async (req, res) => {
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

    // Create transporter
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'ermalkomonidev@gmail.com',
      to: 'ermalkomonidev@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 8px; font-size: 14px; color: #64748b;">
            <p><strong>Sent from:</strong> Portfolio Contact Form</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent from Portfolio Contact Form
Timestamp: ${new Date().toLocaleString()}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    const response: ContactResponse = {
      success: true,
      message: "Message sent successfully! I'll get back to you soon."
    };

    res.json(response);

  } catch (error) {
    console.error('Email sending error:', error);
    
    const response: ContactResponse = {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again later."
    };
    
    res.status(500).json(response);
  }
};
