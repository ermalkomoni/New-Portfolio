import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContact } from "./routes/contact";
import { handleEmailFallback } from "./routes/email-fallback";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  
  // Use fallback email handler in production if email config is not available
  const hasEmailConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS;
  if (hasEmailConfig) {
    app.post("/api/contact", handleContact);
  } else {
    console.log('Email configuration not found, using fallback handler');
    app.post("/api/contact", handleEmailFallback);
  }

  return app;
}
