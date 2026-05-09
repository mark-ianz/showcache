# Architecture

## Technical Stack

ShowCache is built using a modern, performant, and type-safe stack:

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (built on [Radix UI](https://www.radix-ui.com/))
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **API Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)

## Project Structure

The project follows a standard React directory structure designed for scalability:

```text
src/
├── api/          # Axios instances and API endpoint definitions
├── assets/       # Static assets like images and global styles
├── components/   # Reusable UI components (atomic & molecular)
│   ├── header/   # Header-specific navigation components
│   ├── ui/       # Base Shadcn components
│   └── show/     # Components specific to media displays
├── constants/    # Global constants and configuration
├── context/      # React Context providers for global state
├── hooks/        # Custom React hooks (logic reuse)
├── pages/        # Main route components (Landing, Details, etc.)
├── types/        # TypeScript interfaces and type definitions
├── App.tsx       # Main application component
└── main.tsx      # Application entry point
```

## Data Flow & State Management

### Server State
The primary state of the application (movie data, search results, etc.) is managed by **TanStack Query**. This handles:
- Caching API responses.
- Managing loading and error states.
- Background refetching.
- Optimistic updates (where applicable).

### Global UI State
For simple global UI state like theme (dark/light mode) or toast notifications, standard **React Context** or libraries like **Radix UI** are used.

### Local State
Individual components use `useState` and `useReducer` for internal UI logic (e.g., toggle menus, input fields).

## Design System

The design system is based on **Tailwind CSS** tokens. We prioritize:
- **Responsive Layouts**: Using flexbox and grid utilities.
- **Glassmorphism**: Subtle backgrounds with blur effects for a premium feel.
- **Typography**: Inter is the primary font family for a clean, professional look.
- **Micro-animations**: Subtle transitions and hover effects to enhance engagement.
