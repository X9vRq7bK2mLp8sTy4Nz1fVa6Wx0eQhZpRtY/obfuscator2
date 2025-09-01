// AST Node types for Luau parsing
export interface LuauNode {
  type: string;
  start: number;
  end: number;
  [key: string]: any;
}

export interface Identifier extends LuauNode {
  type: 'Identifier';
  name: string;
}

export interface StringLiteral extends LuauNode {
  type: 'StringLiteral';
  value: string;
  raw: string;
}

export interface FunctionDeclaration extends LuauNode {
  type: 'FunctionDeclaration';
  identifier: Identifier;
  parameters: Identifier[];
  body: LuauNode[];
}

export class LuauParser {
  private code: string;
  private position: number;
  private tokens: Token[];

  constructor(code: string) {
    this.code = code;
    this.position = 0;
    this.tokens = this.tokenize();
  }

  private tokenize(): Token[] {
    const tokens: Token[] = [];
    const patterns = [
      { type: 'KEYWORD', regex: /\b(local|function|end|if|then|else|elseif|while|do|for|in|repeat|until|break|return|and|or|not|true|false|nil)\b/ },
      { type: 'IDENTIFIER', regex: /[a-zA-Z_][a-zA-Z0-9_]*/ },
      { type: 'STRING', regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\[\[.*?\]\]/ },
      { type: 'NUMBER', regex: /\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/ },
      { type: 'OPERATOR', regex: /\+\+|--|<=|>=|==|~=|\.\.|\.\.\.|[+\-*/%^#<>=(){}[\]:;,.~]/ },
      { type: 'WHITESPACE', regex: /\s+/ },
      { type: 'COMMENT', regex: /--(?:\[\[.*?\]\]|.*$)/m },
    ];

    let currentPos = 0;
    while (currentPos < this.code.length) {
      let matched = false;
      
      for (const pattern of patterns) {
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags + 'y');
        regex.lastIndex = currentPos;
        const match = regex.exec(this.code);
        
        if (match) {
          if (pattern.type !== 'WHITESPACE') { // Skip whitespace tokens
            tokens.push({
              type: pattern.type,
              value: match[0],
              start: currentPos,
              end: currentPos + match[0].length,
            });
          }
          currentPos += match[0].length;
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        currentPos++; // Skip unknown characters
      }
    }

    return tokens;
  }

  parse(): LuauNode {
    return {
      type: 'Program',
      body: this.parseStatements(),
      start: 0,
      end: this.code.length,
    };
  }

  private parseStatements(): LuauNode[] {
    const statements: LuauNode[] = [];
    
    while (this.position < this.tokens.length) {
      const statement = this.parseStatement();
      if (statement) {
        statements.push(statement);
      }
    }
    
    return statements;
  }

  private parseStatement(): LuauNode | null {
    const token = this.getCurrentToken();
    if (!token) return null;

    switch (token.value) {
      case 'local':
        return this.parseLocalStatement();
      case 'function':
        return this.parseFunctionDeclaration();
      default:
        return this.parseExpressionStatement();
    }
  }

  private parseLocalStatement(): LuauNode {
    this.consumeToken('local');
    const identifier = this.parseIdentifier();
    
    if (this.getCurrentToken()?.value === 'function') {
      this.consumeToken('function');
      return this.parseFunctionBody(identifier);
    } else {
      // Local variable declaration
      let initializer = null;
      if (this.getCurrentToken()?.value === '=') {
        this.consumeToken('=');
        initializer = this.parseExpression();
      }
      
      return {
        type: 'LocalStatement',
        identifier,
        initializer,
        start: identifier.start,
        end: this.position,
      };
    }
  }

  private parseFunctionDeclaration(): LuauNode {
    this.consumeToken('function');
    const identifier = this.parseIdentifier();
    return this.parseFunctionBody(identifier);
  }

  private parseFunctionBody(identifier: Identifier): FunctionDeclaration {
    this.consumeToken('(');
    const parameters: Identifier[] = [];
    
    while (this.getCurrentToken()?.value !== ')') {
      parameters.push(this.parseIdentifier());
      if (this.getCurrentToken()?.value === ',') {
        this.consumeToken(',');
      }
    }
    
    this.consumeToken(')');
    const body = this.parseBlock();
    this.consumeToken('end');
    
    return {
      type: 'FunctionDeclaration',
      identifier,
      parameters,
      body,
      start: identifier.start,
      end: this.position,
    };
  }

  private parseBlock(): LuauNode[] {
    const statements: LuauNode[] = [];
    
    while (this.getCurrentToken()?.value !== 'end' && this.position < this.tokens.length) {
      const statement = this.parseStatement();
      if (statement) {
        statements.push(statement);
      }
    }
    
    return statements;
  }

  private parseExpressionStatement(): LuauNode {
    const expression = this.parseExpression();
    return {
      type: 'ExpressionStatement',
      expression,
      start: expression.start,
      end: expression.end,
    };
  }

  private parseExpression(): LuauNode {
    return this.parseCallExpression();
  }

  private parseCallExpression(): LuauNode {
    let expr = this.parsePrimaryExpression();
    
    while (true) {
      const token = this.getCurrentToken();
      if (token?.value === '(') {
        this.consumeToken('(');
        const args: LuauNode[] = [];
        
        while (this.getCurrentToken()?.value !== ')') {
          args.push(this.parseExpression());
          if (this.getCurrentToken()?.value === ',') {
            this.consumeToken(',');
          }
        }
        
        this.consumeToken(')');
        expr = {
          type: 'CallExpression',
          callee: expr,
          arguments: args,
          start: expr.start,
          end: this.position,
        };
      } else if (token?.value === '.') {
        this.consumeToken('.');
        const property = this.parseIdentifier();
        expr = {
          type: 'MemberExpression',
          object: expr,
          property,
          start: expr.start,
          end: this.position,
        };
      } else if (token?.value === ':') {
        this.consumeToken(':');
        const method = this.parseIdentifier();
        expr = {
          type: 'MethodExpression',
          object: expr,
          method,
          start: expr.start,
          end: this.position,
        };
      } else {
        break;
      }
    }
    
    return expr;
  }

  private parsePrimaryExpression(): LuauNode {
    const token = this.getCurrentToken();
    if (!token) throw new Error('Unexpected end of input');

    if (token.type === 'IDENTIFIER') {
      return this.parseIdentifier();
    } else if (token.type === 'STRING') {
      return this.parseStringLiteral();
    } else if (token.type === 'NUMBER') {
      return this.parseNumberLiteral();
    } else if (token.value === '(') {
      this.consumeToken('(');
      const expr = this.parseExpression();
      this.consumeToken(')');
      return expr;
    }
    
    throw new Error(`Unexpected token: ${token.value}`);
  }

  private parseIdentifier(): Identifier {
    const token = this.consumeToken();
    return {
      type: 'Identifier',
      name: token.value,
      start: token.start,
      end: token.end,
    };
  }

  private parseStringLiteral(): StringLiteral {
    const token = this.consumeToken();
    return {
      type: 'StringLiteral',
      value: token.value.slice(1, -1), // Remove quotes
      raw: token.value,
      start: token.start,
      end: token.end,
    };
  }

  private parseNumberLiteral(): LuauNode {
    const token = this.consumeToken();
    return {
      type: 'NumberLiteral',
      value: parseFloat(token.value),
      raw: token.value,
      start: token.start,
      end: token.end,
    };
  }

  private getCurrentToken(): Token | null {
    return this.tokens[this.position] || null;
  }

  private consumeToken(expectedValue?: string): Token {
    const token = this.tokens[this.position];
    if (!token) throw new Error('Unexpected end of input');
    
    if (expectedValue && token.value !== expectedValue) {
      throw new Error(`Expected '${expectedValue}', got '${token.value}'`);
    }
    
    this.position++;
    return token;
  }
}

interface Token {
  type: string;
  value: string;
  start: number;
  end: number;
}
