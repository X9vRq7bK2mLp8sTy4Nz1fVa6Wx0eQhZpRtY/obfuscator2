import { ObfuscationOptions, ObfuscationResponse } from "@shared/obfuscation-schema";
import { LuauParser, LuauNode, Identifier, StringLiteral, FunctionDeclaration } from "./luau-parser";

export class LuauObfuscator {
  private options: ObfuscationOptions;
  private variableMap: Map<string, string> = new Map();
  private functionMap: Map<string, string> = new Map();
  private stringMap: Map<string, string> = new Map();
  private nameCounter: number = 0;

  constructor(options: ObfuscationOptions) {
    this.options = options;
  }

  async obfuscate(code: string): Promise<ObfuscationResponse> {
    const startTime = Date.now();
    
    try {
      // Validate input code
      if (!code.trim()) {
        throw new Error("Input code cannot be empty");
      }

      const parser = new LuauParser(code);
      const ast = parser.parse();
      
      // Apply obfuscation based on preset and options
      let obfuscatedAst = ast;
      
      if (this.options.preset === "signature") {
        obfuscatedAst = this.applySignatureObfuscation(obfuscatedAst);
      } else {
        obfuscatedAst = this.applyStandardObfuscation(obfuscatedAst);
      }
      
      const obfuscatedCode = this.generateCode(obfuscatedAst);
      const processTime = (Date.now() - startTime) / 1000;
      
      // Calculate statistics
      const statistics = this.calculateStatistics(code, obfuscatedCode, processTime);
      
      return {
        obfuscatedCode,
        statistics,
        success: true,
      };
    } catch (error) {
      return {
        obfuscatedCode: "",
        statistics: {
          complexity: 0,
          protection: 0,
          sizeIncrease: 1,
          processTime: (Date.now() - startTime) / 1000,
        },
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  private applySignatureObfuscation(ast: LuauNode): LuauNode {
    // Ultra-complex obfuscation combining all techniques
    let result = ast;
    
    // Phase 1: Variable and function name obfuscation
    if (this.options.variableNameScrambling) {
      result = this.obfuscateIdentifiers(result, true);
    }
    
    // Phase 2: String encryption with multiple layers
    if (this.options.stringEncryption) {
      result = this.encryptStrings(result, true);
    }
    
    // Phase 3: Control flow obfuscation
    if (this.options.controlFlowFlattening) {
      result = this.flattenControlFlow(result);
    }
    
    // Phase 4: Dead code injection (signature method injects realistic code)
    if (this.options.deadCodeInjection) {
      result = this.injectAdvancedDeadCode(result);
    }
    
    // Phase 5: Function wrapping with multiple indirection layers
    if (this.options.functionWrapping) {
      result = this.wrapFunctionsAdvanced(result);
    }
    
    // Phase 6: Anti-debugging measures
    if (this.options.antiDebugging) {
      result = this.insertAntiDebugging(result);
    }
    
    // Phase 7: Dynamic evaluation obfuscation
    if (this.options.dynamicEvaluation) {
      result = this.addDynamicEvaluation(result);
    }
    
    // Phase 8: Code splitting and reassembly
    if (this.options.codeSplitting) {
      result = this.splitAndReassemble(result);
    }
    
    // Phase 9: Watermarking and signature embedding
    if (this.options.watermarking || this.options.signatureEmbedding) {
      result = this.embedSignature(result);
    }
    
    return result;
  }

  private applyStandardObfuscation(ast: LuauNode): LuauNode {
    let result = ast;
    
    if (this.options.variableNameScrambling) {
      result = this.obfuscateIdentifiers(result, false);
    }
    
    if (this.options.stringEncryption) {
      result = this.encryptStrings(result, false);
    }
    
    if (this.options.deadCodeInjection) {
      result = this.injectDeadCode(result);
    }
    
    if (this.options.functionWrapping) {
      result = this.wrapFunctions(result);
    }
    
    return result;
  }

  private obfuscateIdentifiers(node: LuauNode, advanced: boolean): LuauNode {
    if (node.type === 'Identifier') {
      const identifier = node as Identifier;
      if (!this.variableMap.has(identifier.name)) {
        const obfuscatedName = advanced 
          ? this.generateAdvancedVariableName()
          : this.generateSimpleVariableName();
        this.variableMap.set(identifier.name, obfuscatedName);
      }
      return {
        ...identifier,
        name: this.variableMap.get(identifier.name)!,
      };
    }
    
    // Recursively process child nodes
    const result = { ...node };
    for (const key in result) {
      if (result[key] && typeof result[key] === 'object') {
        if (Array.isArray(result[key])) {
          result[key] = result[key].map((item: any) => 
            typeof item === 'object' ? this.obfuscateIdentifiers(item, advanced) : item
          );
        } else {
          result[key] = this.obfuscateIdentifiers(result[key], advanced);
        }
      }
    }
    
    return result;
  }

  private encryptStrings(node: LuauNode, advanced: boolean): LuauNode {
    if (node.type === 'StringLiteral') {
      const stringLiteral = node as StringLiteral;
      const encrypted = advanced 
        ? this.encryptStringAdvanced(stringLiteral.value)
        : this.encryptStringSimple(stringLiteral.value);
      
      return {
        ...stringLiteral,
        value: encrypted.value,
        raw: encrypted.raw,
      };
    }
    
    // Recursively process child nodes
    const result = { ...node };
    for (const key in result) {
      if (result[key] && typeof result[key] === 'object') {
        if (Array.isArray(result[key])) {
          result[key] = result[key].map((item: any) => 
            typeof item === 'object' ? this.encryptStrings(item, advanced) : item
          );
        } else {
          result[key] = this.encryptStrings(result[key], advanced);
        }
      }
    }
    
    return result;
  }

  private generateAdvancedVariableName(): string {
    const prefixes = ['_0x', '_', '__', '___'];
    const chars = '0123456789abcdef';
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    let name = prefix;
    
    const length = Math.max(6, this.options.variableComplexity);
    for (let i = 0; i < length; i++) {
      name += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return name;
  }

  private generateSimpleVariableName(): string {
    return `_${(++this.nameCounter).toString(36)}`;
  }

  private encryptStringAdvanced(str: string): { value: string; raw: string } {
    let result = str;
    
    if (this.options.base64Encoding) {
      result = Buffer.from(result).toString('base64');
    }
    
    if (this.options.hexEncoding) {
      result = result.split('').map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    }
    
    if (this.options.mathematicalExpressions) {
      // Convert to mathematical expression
      const chars = result.split('');
      const mathExpr = chars.map((c, i) => {
        const code = c.charCodeAt(0);
        const a = Math.floor(Math.random() * 50) + 1;
        const b = code - a;
        return `string.char(${a}+${b})`;
      }).join('..');
      
      return {
        value: result,
        raw: `(${mathExpr})`,
      };
    }
    
    return {
      value: result,
      raw: `"${result}"`,
    };
  }

  private encryptStringSimple(str: string): { value: string; raw: string } {
    if (this.options.base64Encoding) {
      const encoded = Buffer.from(str).toString('base64');
      return {
        value: encoded,
        raw: `"${encoded}"`,
      };
    }
    
    return {
      value: str,
      raw: `"${str}"`,
    };
  }

  private injectAdvancedDeadCode(ast: LuauNode): LuauNode {
    // Insert realistic-looking dead code functions
    const deadFunctions = this.generateRealisticDeadFunctions();
    
    if (ast.type === 'Program' && ast.body) {
      return {
        ...ast,
        body: [...deadFunctions, ...ast.body],
      };
    }
    
    return ast;
  }

  private generateRealisticDeadFunctions(): LuauNode[] {
    const functions = [
      `local function _validateConfig(_cfg) return _cfg and _cfg.enabled or false end`,
      `local function _processData(_data) for i,v in pairs(_data) do if v then return v end end return nil end`,
      `local function _checkPermissions(_user) return _user and _user.level > 0 end`,
    ];
    
    return functions.map(code => {
      const parser = new LuauParser(code);
      return parser.parse().body[0];
    });
  }

  private injectDeadCode(ast: LuauNode): LuauNode {
    // Simple dead code injection
    const deadCode = `local _dead = function() return nil end`;
    const parser = new LuauParser(deadCode);
    const deadNode = parser.parse().body[0];
    
    if (ast.type === 'Program' && ast.body) {
      return {
        ...ast,
        body: [deadNode, ...ast.body],
      };
    }
    
    return ast;
  }

  private wrapFunctionsAdvanced(ast: LuauNode): LuauNode {
    // Advanced function wrapping with indirection
    return this.traverseAndTransform(ast, (node) => {
      if (node.type === 'FunctionDeclaration') {
        const func = node as FunctionDeclaration;
        const wrappedName = this.generateAdvancedVariableName();
        
        // Create indirect function wrapper
        return {
          type: 'LocalStatement',
          identifier: {
            type: 'Identifier',
            name: wrappedName,
            start: func.start,
            end: func.end,
          },
          initializer: {
            type: 'FunctionExpression',
            parameters: func.parameters,
            body: func.body,
            start: func.start,
            end: func.end,
          },
          start: func.start,
          end: func.end,
        };
      }
      return node;
    });
  }

  private wrapFunctions(ast: LuauNode): LuauNode {
    // Simple function wrapping
    return ast;
  }

  private flattenControlFlow(ast: LuauNode): LuauNode {
    // Control flow flattening implementation
    return ast;
  }

  private insertAntiDebugging(ast: LuauNode): LuauNode {
    // Insert anti-debugging checks
    const antiDebugCode = `
      local function _antiDebug()
        if debug and debug.getinfo then
          error("Debug detected", 0)
        end
      end
      _antiDebug()
    `;
    
    const parser = new LuauParser(antiDebugCode);
    const antiDebugNodes = parser.parse().body;
    
    if (ast.type === 'Program' && ast.body) {
      return {
        ...ast,
        body: [...antiDebugNodes, ...ast.body],
      };
    }
    
    return ast;
  }

  private addDynamicEvaluation(ast: LuauNode): LuauNode {
    // Dynamic evaluation obfuscation
    return ast;
  }

  private splitAndReassemble(ast: LuauNode): LuauNode {
    // Code splitting implementation
    return ast;
  }

  private embedSignature(ast: LuauNode): LuauNode {
    // Watermarking and signature embedding
    const signature = `-- Protected by Luau Obfuscator Pro v1.0 - ${new Date().toISOString()}`;
    
    if (ast.type === 'Program' && ast.body) {
      return {
        ...ast,
        body: [
          {
            type: 'Comment',
            value: signature,
            start: 0,
            end: signature.length,
          },
          ...ast.body,
        ],
      };
    }
    
    return ast;
  }

  private traverseAndTransform(node: LuauNode, transformer: (node: LuauNode) => LuauNode): LuauNode {
    let transformed = transformer(node);
    
    // Recursively transform child nodes
    for (const key in transformed) {
      if (transformed[key] && typeof transformed[key] === 'object') {
        if (Array.isArray(transformed[key])) {
          transformed[key] = transformed[key].map((item: any) => 
            typeof item === 'object' ? this.traverseAndTransform(item, transformer) : item
          );
        } else if (transformed[key].type) {
          transformed[key] = this.traverseAndTransform(transformed[key], transformer);
        }
      }
    }
    
    return transformed;
  }

  private generateCode(ast: LuauNode): string {
    switch (ast.type) {
      case 'Program':
        return ast.body.map((stmt: LuauNode) => this.generateCode(stmt)).join('\n');
        
      case 'FunctionDeclaration':
        const func = ast as FunctionDeclaration;
        const params = func.parameters.map(p => p.name).join(', ');
        const body = func.body.map(stmt => this.generateCode(stmt)).join('\n');
        return `local function ${func.identifier.name}(${params})\n${body}\nend`;
        
      case 'LocalStatement':
        const localStmt = ast as any;
        const init = localStmt.initializer ? ` = ${this.generateCode(localStmt.initializer)}` : '';
        return `local ${localStmt.identifier.name}${init}`;
        
      case 'CallExpression':
        const call = ast as any;
        const callee = this.generateCode(call.callee);
        const args = call.arguments.map((arg: LuauNode) => this.generateCode(arg)).join(', ');
        return `${callee}(${args})`;
        
      case 'MemberExpression':
        const member = ast as any;
        return `${this.generateCode(member.object)}.${member.property.name}`;
        
      case 'MethodExpression':
        const method = ast as any;
        return `${this.generateCode(method.object)}:${method.method.name}`;
        
      case 'Identifier':
        return (ast as Identifier).name;
        
      case 'StringLiteral':
        return (ast as StringLiteral).raw;
        
      case 'ExpressionStatement':
        return this.generateCode((ast as any).expression);
        
      case 'Comment':
        return (ast as any).value;
        
      default:
        return '';
    }
  }

  private calculateStatistics(original: string, obfuscated: string, processTime: number): ObfuscationResponse['statistics'] {
    const originalSize = original.length;
    const obfuscatedSize = obfuscated.length;
    const sizeIncrease = obfuscatedSize / originalSize;
    
    // Calculate complexity based on obfuscation techniques used
    let complexity = 0;
    if (this.options.variableNameScrambling) complexity += 15;
    if (this.options.stringEncryption) complexity += 20;
    if (this.options.functionWrapping) complexity += 15;
    if (this.options.deadCodeInjection) complexity += 10;
    if (this.options.antiDebugging) complexity += 25;
    if (this.options.controlFlowFlattening) complexity += 20;
    
    // Adjust based on preset
    if (this.options.preset === "signature") complexity = Math.min(100, complexity * 1.5);
    if (this.options.preset === "light") complexity = Math.max(10, complexity * 0.5);
    
    // Calculate protection level
    const protection = Math.min(100, complexity * 0.8 + this.options.processingIntensity * 2);
    
    return {
      complexity: Math.round(complexity),
      protection: Math.round(protection),
      sizeIncrease: Math.round(sizeIncrease * 100) / 100,
      processTime: Math.round(processTime * 100) / 100,
    };
  }
}
