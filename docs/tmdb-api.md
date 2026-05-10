# TMDB API Reference

This document serves as the source of truth for the TMDB API integration in ShowCache.

## Overview

ShowCache uses [The Movie Database (TMDB) API v3](https://developer.themoviedb.org/reference/intro/getting-started).

- **Base URL**: `https://api.themoviedb.org/3`
- **Auth**: Bearer Token Authorization

## Key Endpoints

### Movies
- **Popular**: `GET /movie/popular`
- **Top Rated**: `GET /movie/top_rated`
- **Upcoming**: `GET /movie/upcoming`
- **Now Playing**: `GET /movie/now_playing`
- **Details**: `GET /movie/{movie_id}`
- **Credits**: `GET /movie/{movie_id}/credits`
- **Recommendations**: `GET /movie/{movie_id}/recommendations`

### TV Shows
- **Popular**: `GET /tv/popular`
- **Top Rated**: `GET /tv/top_rated`
- **Trending (Week)**: `GET /trending/tv/week`
- **Airing Today**: `GET /tv/airing_today`
- **On The Air**: `GET /tv/on_the_air`
- **Details**: `GET /tv/{series_id}`
- **Season Details**: `GET /tv/{series_id}/season/{season_number}`

### Search & Discovery
- **Multi Search**: `GET /search/multi`
- **Trending (All)**: `GET /trending/all/day` or `GET /trending/all/week`
- **Discover Movies**: `GET /discover/movie` (Supports extensive filtering like `with_genres`, `primary_release_year`, `sort_by`, etc.)
- **Discover TV**: `GET /discover/tv` (Supports filtering like `with_genres`, `first_air_date_year`, etc.)

### Genres
- **Movie List**: `GET /genre/movie/list`
- **TV List**: `GET /genre/tv/list`

### People
- **Details**: `GET /person/{person_id}`
- **Movie Credits**: `GET /person/{person_id}/movie_credits`
- **TV Credits**: `GET /person/{person_id}/tv_credits`
- **Popular People**: `GET /person/popular`

## Configuration

The API configuration is located in `src/api/axios.config.ts`.
Images are served from `https://image.tmdb.org/t/p/`. 
Common sizes used:
- `w500` for posters
- `w780` for medium backdrops
- `original` for high-quality backdrops
- `h632` for person profiles

## TMDB API v4 (User Accounts & Lists)

TMDB v4 is used for user-authenticated actions and advanced list management.

- **Base URL**: `https://api.themoviedb.org/4`
- **Auth Header**: `Authorization: Bearer <USER_ACCESS_TOKEN>`

### V4 Authentication Flow

1. **Create Request Token**: `POST /4/auth/request_token` (Optional `redirect_to` body param).
2. **User Approval**: Redirect user to `https://www.themoviedb.org/auth/access?request_token={request_token}`.
3. **Create Access Token**: `POST /4/auth/access_token` with the approved `request_token` to get the `access_token` and `account_id`.

### User Account Endpoints (Read-Only)
Requires `account_id` (V4 object ID).
- **Favorites**: `GET /4/account/{account_id}/favorite/movies`
- **Watchlist**: `GET /4/account/{account_id}/watchlist/movies`
- **Rated**: `GET /4/account/{account_id}/rated/movies`
- **User Lists**: `GET /4/account/{account_id}/lists`

### Custom Lists (Full CRUD)
- **Create List**: `POST /4/list` (Body: `{ "name": "...", "description": "..." }`)
- **Add Items**: `POST /4/list/{list_id}/items` (Body: `[{"media_type": "movie", "media_id": 123}, ...]`)
- **Update Items**: `PUT /4/list/{list_id}/items` (Body: `[{"media_type": "movie", "media_id": 123, "comment": "..."}]`)
- **Remove Items**: `DELETE /4/list/{list_id}/items` (Body: `[{"media_type": "movie", "media_id": 123}]`)
- **Delete List**: `DELETE /4/list/{list_id}`

## Integration Details

We use **Axios** for HTTP requests and **TanStack Query** for state management and caching.
Hooks are provided for common patterns:
- `useSearch`: Generic search hook.
- `useMovieDetails`: Detailed movie info.
- `useTVDetails`: Detailed TV info.
- `useDiscover`: (Proposed) Hook for advanced filtering.
