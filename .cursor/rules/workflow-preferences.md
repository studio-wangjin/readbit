## Workflow Preferences - Process & Execution Management

### Development Workflow
- Follow Next.js App Router patterns and best practices
- Prioritize Server Components over Client Components
- Minimize 'use client' usage:
  - Prefer server components and Next.js SSR features
  - Use 'use client' only for Web API access in small components
  - Avoid using 'use client' for data fetching or state management

### Performance Considerations
- Prioritize Web Vitals (LCP, CLS, FID)
- Wrap client components in Suspense with fallback
- Use dynamic loading for non-critical components
- Code in services/ directory should throw user-friendly errors that tanStackQuery can catch

### Error Handling Workflow
- Use error boundaries using error.tsx and global-error.tsx files
- Handle expected errors as return values in Server Actions
- Implement consistent error handling and success responses

### Development Standards
- Rely on Next.js App Router for state changes
- Always start with proper TypeScript interfaces/types
- Follow strict FSD architecture principles for module organization
- Create thorough documentation for complex features
- Favor composition over inheritance
- Use utility functions from shared/ layer 