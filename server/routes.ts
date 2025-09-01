import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { obfuscationRequestSchema } from "@shared/obfuscation-schema";
import { LuauObfuscator } from "./services/luau-obfuscator";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Obfuscation endpoint
  app.post("/api/obfuscate", async (req, res) => {
    try {
      const { code, options } = obfuscationRequestSchema.parse(req.body);
      
      const obfuscator = new LuauObfuscator(options);
      const result = await obfuscator.obfuscate(code);
      
      res.json(result);
    } catch (error) {
      res.status(400).json({
        obfuscatedCode: "",
        statistics: {
          complexity: 0,
          protection: 0,
          sizeIncrease: 1,
          processTime: 0,
        },
        success: false,
        error: error instanceof Error ? error.message : "Invalid request",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
