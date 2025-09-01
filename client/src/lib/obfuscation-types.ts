export interface ObfuscationSession {
  id: string;
  name: string;
  timestamp: Date;
  originalCode: string;
  obfuscatedCode: string;
  options: any;
  statistics: any;
}

export const DEFAULT_OBFUSCATION_OPTIONS = {
  preset: "standard" as const,
  variableNameScrambling: true,
  functionWrapping: true,
  indirectFunctionCalls: false,
  customNamePatterns: true,
  variableComplexity: 7,
  stringEncryption: true,
  base64Encoding: true,
  hexEncoding: false,
  mathematicalExpressions: true,
  stringConcealmentLevel: 3,
  deadCodeInjection: true,
  controlFlowFlattening: false,
  codeSplitting: true,
  syntaxTreeManipulation: false,
  antiDebugging: true,
  dynamicEvaluation: false,
  watermarking: true,
  signatureEmbedding: false,
  preserveComments: false,
  optimizePerformance: true,
  processingIntensity: 6,
};

export const PRESET_CONFIGURATIONS = {
  light: {
    ...DEFAULT_OBFUSCATION_OPTIONS,
    variableNameScrambling: true,
    functionWrapping: false,
    stringEncryption: false,
    deadCodeInjection: false,
    antiDebugging: false,
    variableComplexity: 3,
    processingIntensity: 2,
  },
  standard: DEFAULT_OBFUSCATION_OPTIONS,
  signature: {
    ...DEFAULT_OBFUSCATION_OPTIONS,
    indirectFunctionCalls: true,
    controlFlowFlattening: true,
    syntaxTreeManipulation: true,
    dynamicEvaluation: true,
    signatureEmbedding: true,
    hexEncoding: true,
    variableComplexity: 10,
    stringConcealmentLevel: 5,
    processingIntensity: 10,
  },
};
