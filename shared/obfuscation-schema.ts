import { z } from "zod";

export const obfuscationOptionsSchema = z.object({
  // Preset selection
  preset: z.enum(["light", "standard", "signature"]).default("standard"),
  
  // Variable & Function Protection
  variableNameScrambling: z.boolean().default(true),
  functionWrapping: z.boolean().default(true),
  indirectFunctionCalls: z.boolean().default(false),
  customNamePatterns: z.boolean().default(true),
  variableComplexity: z.number().min(1).max(10).default(7),
  
  // String & Constant Protection
  stringEncryption: z.boolean().default(true),
  base64Encoding: z.boolean().default(true),
  hexEncoding: z.boolean().default(false),
  mathematicalExpressions: z.boolean().default(true),
  stringConcealmentLevel: z.number().min(1).max(5).default(3),
  
  // Control Flow & Structure
  deadCodeInjection: z.boolean().default(true),
  controlFlowFlattening: z.boolean().default(false),
  codeSplitting: z.boolean().default(true),
  syntaxTreeManipulation: z.boolean().default(false),
  
  // Anti-Analysis Protection
  antiDebugging: z.boolean().default(true),
  dynamicEvaluation: z.boolean().default(false),
  watermarking: z.boolean().default(true),
  signatureEmbedding: z.boolean().default(false),
  
  // Performance & Compatibility
  preserveComments: z.boolean().default(false),
  optimizePerformance: z.boolean().default(true),
  processingIntensity: z.number().min(1).max(10).default(6),
});

export const obfuscationRequestSchema = z.object({
  code: z.string().min(1, "Code cannot be empty"),
  options: obfuscationOptionsSchema,
});

export const obfuscationResponseSchema = z.object({
  obfuscatedCode: z.string(),
  statistics: z.object({
    complexity: z.number(),
    protection: z.number(),
    sizeIncrease: z.number(),
    processTime: z.number(),
  }),
  success: z.boolean(),
  error: z.string().optional(),
});

export type ObfuscationOptions = z.infer<typeof obfuscationOptionsSchema>;
export type ObfuscationRequest = z.infer<typeof obfuscationRequestSchema>;
export type ObfuscationResponse = z.infer<typeof obfuscationResponseSchema>;
export type ObfuscationStatistics = ObfuscationResponse['statistics'];
