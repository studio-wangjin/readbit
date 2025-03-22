## Coding Preferences - Code Style & Quality Standards

### Core Principles
- **Simplicity**: Always prioritize the simplest solution over complexity
- **DRY (Don't Repeat Yourself)**: Avoid code duplication, reuse functionality
- **Organization**: Keep files under 300 lines, refactor when needed
- **Documentation**: Create `/docs/[component].md` after major component development

### Code Structure
- Use functional, declarative programming (avoid classes)
- Favor composition over inheritance
- Structure files: exports → subcomponents → helpers → types
- Follow naming conventions:
  - Use descriptive names with auxiliary verbs (isLoading, handleClick)
  - Use lowercase with dashes for directories (components/auth-wizard)
  - Prefer named exports for components
- Apply RORO pattern (Receive Object, Return Object)

### JavaScript/TypeScript
- Use "function" keyword for pure functions, omit semicolons
- Prefer interfaces over types, use maps instead of enums
- Minimize conditional syntax:
  - Avoid unnecessary curly braces
  - Omit braces for single-line statements
- Always start with proper TypeScript interfaces/types

### Error Handling
- Handle errors and edge cases first (early returns)
- Place happy path last for better readability
- Avoid nested if statements and unnecessary else blocks
- Use guard clauses for preconditions
- Return errors as values in Server Actions rather than try/catch
- Create error boundaries in error.tsx and global-error.tsx files
- Services should throw user-friendly errors (for tanStackQuery)

### React Components
- Write as functions (not arrow functions stored in constants)
- Use declarative JSX
- Extract static content to variables outside render functions
- Place interfaces and types at file end
- Prioritize Server Components where possible
- Minimize 'use client' usage (only for Web API access)
- Wrap client components in Suspense with fallback 