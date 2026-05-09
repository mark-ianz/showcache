# API Integration

## TMDB API

ShowCache is powered by [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs/getting-started).

### Configuration

All API logic is centralized in `src/api`. We use **Axios** with a base configuration:

- **Base URL**: `https://api.themoviedb.org/3`
- **Authentication**: Bearer Token (configured in `.env` as `VITE_TMDB_ACCESS_TOKEN_AUTH`).

```typescript
// Example axios instance setup
const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH}`,
  },
});
```

## Data Fetching with TanStack Query

We use `@tanstack/react-query` to manage asynchronous state. This provides:

- **Automatic Caching**: Data is cached by a unique key (e.g., `['movie', movieId]`).
- **Loading/Error States**: Simple access to `isLoading`, `isError`, and `error` flags.
- **Prefetching**: Improving perceived performance by fetching data before the user navigates.

### Custom Hooks

Common API calls are abstracted into custom hooks in `src/hooks`:

- `useSearch`: Handles dynamic search across multiple categories.
- `useMovieDetails`: Fetches comprehensive data for a single movie.
- `usePersonCredits`: Retrieves the filmography for an actor.

## Currency Conversion

For financial data (Budget/Revenue), we integrate with the **ExchangeRate-API** to provide localized values. This is controlled by `VITE_EXCHANGE_RATE_API_KEY`.

## Error Handling

API errors are caught globally or at the hook level. We use a dedicated `ErrorComponent.tsx` to provide a user-friendly fallback UI when data fails to load.

## Rate Limiting

We adhere to TMDB's rate limits. TanStack Query's caching significantly reduces the number of duplicate requests, ensuring we stay within limits even with high user interaction.
