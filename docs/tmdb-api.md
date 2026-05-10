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

## Integration Details

We use **Axios** for HTTP requests and **TanStack Query** for state management and caching.
Hooks are provided for common patterns:
- `useSearch`: Generic search hook.
- `useMovieDetails`: Detailed movie info.
- `useTVDetails`: Detailed TV info.
- `useDiscover`: (Proposed) Hook for advanced filtering.
