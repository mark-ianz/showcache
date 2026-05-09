# Components

## Overview

ShowCache uses a modular component architecture. We leverage **Shadcn UI** for foundational elements and build custom "Cinematic" components for media-specific needs.

## UI Component Library (Shadcn)

We use a curated set of components from Shadcn UI, located in `src/components/ui`:

- **Dialog/Popover**: For interactive overlays and menus.
- **Scroll Area**: Custom styled scrollbars for a consistent look across browsers.
- **Select/Switch**: Form elements for filtering and settings.
- **Tabs**: For switching between different categories (e.g., Movies vs. TV).
- **Toast**: For non-intrusive user notifications.

## Custom Cinematic Components

These are specific to the ShowCache experience:

### Media Displays
- **`Rating.tsx`**: A visual indicator for movie ratings using custom color mapping.
- **`ScrollableSection.tsx`**: A reusable horizontal carousel for browsing lists of movies or actors.
- **`Seasons.tsx`**: A dedicated display for TV show seasons and episode counts.

### Navigation
- **`HeaderText.tsx`**: Premium typography components for consistent section titles.
- **`GoBackButton.tsx`**: A context-aware navigation helper.
- **`ScrollToTopButton.tsx`**: Enhances UX on long detail pages.

### Person/Media Detail
- **`DynamicMediaTabs.tsx`**: Manages complex tabs on the person/show detail pages.
- **`InfoItem.tsx`**: Standardized display for metadata facts (Budget, Revenue, Status).

## Best Practices

1. **Composition**: Favor component composition over large, monolithic components.
2. **Prop Types**: Always define TypeScript interfaces for component props.
3. **Accessibility**: Use Radix UI primitives to ensure high keyboard and screen reader support.
4. **Styling**: Use Tailwind utility classes; avoid inline styles. Use `cn()` utility from `src/lib/utils.ts` for conditional class merging.
