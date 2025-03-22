## Tech Stack - Tools & Technologies

### Core Technologies
- TypeScript, Node.js, Next.js 15 App Router
- React 19 with React Server Components (RSC)
- Supabase for backend, database, and authentication
- Zod for schema validation and type safety
- React Hook Form for form management
- Shadcn UI with Tailwind CSS

### Architecture - Feature-Sliced Design (FSD)
- Layer hierarchy (top to bottom):
  - app/ - Application configuration
  - pages/ - Route pages and layouts
  - widgets/ - Independent page blocks
  - features/ - User interactions and business logic
  - entities/ - Business entities (users, products)
  - shared/ - Reusable infrastructure and UI
- Rules:
  - Each module exposes Public API via index.ts
  - Modules only depend on lower layers
  - Same-layer dependencies are prohibited
  - Organize slices into ui/, model/, and lib/ segments
  - Group by domains/ for business separation
  - Develop features/entities in isolation

### Backend - Supabase
- Implement row-level security (RLS) policies
- Define TypeScript types for tables and queries
- Use PostgreSQL features (foreign keys, constraints)
- Leverage realtime features for live updates
- Version control database migrations
- Utilize Edge Functions for serverless operations

### Data Validation & Forms
- Zod:
  - Create schemas in separate files with 'Schema' suffix
  - Generate types with z.infer<typeof schema>
  - Use refinement for complex validation
  - Compose schemas for reusability
- React Hook Form:
  - Integrate with Zod via @hookform/resolvers/zod
  - Use FormProvider for nested forms
  - Prefer register over uncontrolled components
  - Minimize watch() usage for performance
  - Split complex forms into smaller components
  - Reset after successful submission

### Server Actions
- Use next-safe-action for type-safety
- Define schemas with Zod
- Return consistent ActionResponse types
- Use useActionState for client-side error handling

### UI & Styling
- Mobile-first responsive design with Tailwind
- Shadcn UI for component library
- Optimize images with WebP, lazy loading
- Ensure accessibility with proper ARIA attributes 