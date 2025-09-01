# Overview

This is a Luau code obfuscation web application built with a React frontend and Express backend. The application allows users to input Luau code and apply various obfuscation techniques to protect their source code from reverse engineering. It features a modern UI with customizable obfuscation settings, real-time processing, and session history management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Extensive use of shadcn/ui components built on Radix UI primitives
- **Styling**: TailwindCSS with a custom dark theme configuration and CSS variables
- **State Management**: TanStack Query for server state management, React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: Feature-based organization with reusable UI components in `/client/src/components`

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful endpoints for obfuscation processing and health checks
- **Code Processing**: Custom Luau parser and obfuscator service with configurable options
- **Data Storage**: In-memory storage implementation with interfaces for future database integration
- **Development Setup**: Hot reload with Vite integration in development mode

## Data Storage Solutions
- **Current Implementation**: In-memory storage using Map data structures for user and session management
- **Database Schema**: Drizzle ORM configured for PostgreSQL with user tables defined
- **Session Storage**: Temporary client-side history management for obfuscation sessions
- **Future Scalability**: Database abstraction layer ready for PostgreSQL integration

## Authentication and Authorization
- **Current State**: Basic user schema defined but not actively implemented in the UI
- **Session Management**: Express sessions configured with PostgreSQL store support
- **Security**: Prepared for future implementation with password hashing and session validation

## External Dependencies

### Development and Build Tools
- **Vite**: Frontend build tool with React plugin and development server
- **TypeScript**: Type safety across frontend, backend, and shared code
- **ESBuild**: Backend bundling for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### UI and Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **TailwindCSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe variant API for component styling

### Data Management
- **TanStack Query**: Server state management with caching and synchronization
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **Zod**: Runtime type validation for API requests and responses

### Backend Services
- **Express**: Web application framework with middleware support
- **Neon Database**: PostgreSQL hosting service (configured but not actively used)
- **Date-fns**: Date manipulation utilities for timestamp handling

### Code Processing
- **Custom Luau Parser**: Tokenization and AST generation for Luau syntax
- **Obfuscation Engine**: Multiple protection techniques including variable scrambling, string encryption, and control flow manipulation
- **Performance Monitoring**: Request timing and response logging middleware