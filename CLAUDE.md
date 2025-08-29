# CLAUDE.md

Always answer in Korean.
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Readbit is a Next.js application that helps users "turn complex articles into bite-sized learning for daily growth." It's a reading application that transforms long articles into shorter, digestible sections with gamification elements to encourage daily learning habits.

## Development Commands

### Core Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Install dependencies
npm install
```

### Code Quality & Testing

```bash
# ESLint linting
npm run lint


# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Technology Stack

### Core Framework

- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling

### Key Libraries

- **Supabase**: Database and authentication (@supabase/supabase-js, @supabase/ssr)
- **React Query**: Server state management (@tanstack/react-query)
- **React Hook Form**: Form management with Zod validation
- **Shadcn/ui**: UI component library (configured for FSD structure)
- **Lucide React**: Icon library
- **next-safe-action**: Type-safe server actions

### Testing

- **Jest** with jsdom environment
- **Testing Library React**
- Tests should be placed in `__tests__/` directories or use `.test.ts/.spec.ts` suffixes

## UI Components

### Shadcn/ui Integration

```bash
# Add new Shadcn component
npx shadcn@latest add button
```

### Icons

Use Lucide React icons:

```tsx
import { Book, Settings } from 'lucide-react';
```

## Authentication & Database

### Supabase Setup

- Environment variables needed in `.env.local` (contact @milooy for values)
- Authentication configured in `src/shared/lib/auth.ts`
- Database client setup in `src/shared/lib/supabase/`

### Authentication Flow

- OAuth and email/password authentication
- Protected routes via middleware
- Auth state management in `src/features/auth/`

## Article Management

### Core Features

- **Article scraping**: URL input → automatic content extraction
- **Content parsing**: Long articles split into readable sections
- **Reading progress**: Track user progress through articles
- **Notes system**: Users can add notes to article sections

### Key Files

- `src/features/article/api/`: Article API calls
- `src/features/article/lib/html/`: Content parsing utilities
- `src/widgets/article-section/`: Article section display

## Development Workflow

### Environment Setup

1. Copy `.env.example` to `.env.local`
2. Get environment values from @milooy
3. Run `npm install && npm run dev`

### Code Style

- ESLint configuration extends Next.js defaults
- TypeScript strict mode enabled
- Path aliases: `@/*` maps to project root

### Testing Strategy

- Unit tests for utility functions (especially in `src/features/article/lib/`)
- Component tests for UI components
- Integration tests for key user flows
- Jest configured with Next.js and jsdom

## Key Business Logic

### Reading System

- Articles are split into sections for digestible reading
- Users can only read limited sections per day (gamification)
- Reading progress tracked with notes requirement
- Streak system encourages daily engagement

### Content Processing

- HTML content parsing and sanitization
- Image URL conversion for external articles
- Text extraction and section splitting
- Content stored as HTML arrays for rendering
