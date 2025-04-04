# Readbit

> Turn complex article into bite-sized learning for daily growth

See [PRD (Product Requirements Document)](docs/prd-ko.md)

## Developers

- milooy
- w.hanseul

## Local development

1. Create `.env.local` file:

```sh
$ cp .env.example .env.local
```

Contact @milooy for environment variable values.

2. Run dev server

```sh
$ npm install
$ npm run dev
```

## Architecture

This project follows Feature-Sliced Design (FSD) architecture. See [/docs/architecture-ko.md](/docs/architecture-ko.md) for details.

We use [Steiger](https://github.com/feature-sliced/steiger) to enforce FSD architecture rules:

```sh
# Check architecture violations
$ npm run lint:fsd

# Fix some violations automatically
$ npm run lint:fsd:fix
```

## UI

### Components from Shadcn UI

This project uses [Shadcn UI](https://ui.shadcn.com/) for components. We've integrated it with our FSD architecture by placing components in the `shared` layer:

```sh
# Add a new component
$ npx shadcn-ui@latest add button

# This will add the component to src/shared/ui according to our FSD structure
```

Refer to our `components.json` for the full configuration.

### Icons from Lucide

We use [Lucide React](https://lucide.dev/guide/packages/lucide-react) for icons. Lucide is a tree-shakable icon library that provides a wide range of simple icons.

```jsx
import { Book, Settings, User } from 'lucide-react';

// Usage
function MyComponent() {
  return (
    <div>
      <Book size={24} /> {/* Default size is 24 */}
      <Settings color="blue" />
      <User strokeWidth={1.5} /> {/* Default strokeWidth is 2 */}
    </div>
  );
}
```

## DX enhncemens

### MCP

We use [MCP](https://github.com/modelcontextprotocol/server) to sync data between Supabase and Cursor.

Copy and paste `./.cursor/mcp.example.json` to `./.cursor/mcp.json` and fill in the values.
