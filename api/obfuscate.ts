import type { VercelRequest, VercelResponse } from '@vercel/node';
import { obfuscationRequestSchema } from "../shared/obfuscation-schema";
import { LuauObfuscator } from "../server/services/luau-obfuscator";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, options } = obfuscationRequestSchema.parse(req.body);
    
    const obfuscator = new LuauObfuscator(options);
    const result = await obfuscator.obfuscate(code);
    
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
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
}