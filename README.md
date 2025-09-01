# Luau Obfuscator Pro

A mobile-optimized Luau code obfuscator with advanced protection features. Built with React, TypeScript, and Vercel serverless functions.

## Features

- 🔒 **Advanced Obfuscation**: 15+ customizable protection options
- 📱 **Mobile-First Design**: Optimized touch interface and responsive layout
- ⚡ **Serverless Architecture**: Fast, scalable deployment on Vercel
- 🎨 **Dark Theme**: Professional developer-friendly interface
- 📊 **Real-time Statistics**: Protection complexity and performance metrics
- 📝 **Session History**: Save and reload previous obfuscation sessions

## Obfuscation Features

### Protection Levels
- **Light**: Basic variable scrambling
- **Standard**: Comprehensive protection with string encryption
- **Signature**: Ultra-complex obfuscation with all features enabled

### Advanced Options
- Variable name scrambling with complexity control
- String encryption (Base64, Hex, Mathematical expressions)
- Dead code injection
- Function wrapping and indirection
- Control flow flattening
- Anti-debugging measures
- Watermarking and signature embedding

## Quick Start

### Local Development

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd luau-obfuscator-pro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5000`

### Deploy to Vercel

1. **GitHub Integration**:
   - Push your code to GitHub
   - Connect your GitHub repository to Vercel
   - Vercel will automatically deploy on every push

2. **Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Manual Deploy**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings (auto-detected)

## Project Structure

```
├── api/                    # Vercel serverless functions
│   ├── obfuscate.ts       # Main obfuscation endpoint
│   └── health.ts          # Health check endpoint
├── client/                # React frontend application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/         # React hooks
│   │   ├── lib/           # Utilities and types
│   │   └── pages/         # Page components
│   └── dist/              # Build output
├── server/                # Original Express server (for local dev)
│   └── services/          # Obfuscation logic
├── shared/                # Shared types and schemas
└── vercel.json           # Vercel configuration

```

## API Endpoints

- `POST /api/obfuscate` - Obfuscate Luau code
- `GET /api/health` - Health check

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS
- **State Management**: TanStack Query
- **Backend**: Vercel Serverless Functions
- **Parsing**: Custom Luau AST parser
- **Deployment**: Vercel

## Environment Variables

No environment variables are required for basic functionality. The application runs entirely on the frontend and serverless functions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.

## Performance

- **Serverless**: Scales automatically with traffic
- **Edge Optimized**: Fast response times globally
- **Mobile Optimized**: Touch-friendly interface
- **Lightweight**: Minimal bundle size with code splitting