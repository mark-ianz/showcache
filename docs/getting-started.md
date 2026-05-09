# Getting Started

Follow these instructions to get a local copy of ShowCache up and running.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **npm**: Version 9 or higher (usually comes with Node.js).
- **TMDB API Key**: You'll need a Bearer Token from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api).
- **Exchange Rate API Key**: (Optional) For currency conversion features, get a key from [ExchangeRate-API](https://www.exchangerate-api.com/).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mark-ianz/showcache.git
   cd showcache
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory and add your API keys:

```bash
# TMDB Access Token (Required)
VITE_TMDB_ACCESS_TOKEN_AUTH=your_tmdb_access_token_here

# Exchange Rate API Key (Optional)
VITE_EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key_here
```

> [!IMPORTANT]
> Ensure your `.env` file is added to `.gitignore` to prevent leaking your API keys.

## Development Commands

- **Start Development Server**: Runs the app in development mode with hot-reload.
  ```bash
  npm run dev
  ```
  Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

- **Build for Production**: Compiles the app for production.
  ```bash
  npm run build
  ```

- **Preview Production Build**: Runs the production build locally for testing.
  ```bash
  npm run preview
  ```

- **Linting**: Checks the code for stylistic and functional issues.
  ```bash
  npm run lint
  ```

## Project Deployment

This project is configured for easy deployment on platforms like **Netlify** or **Vercel**. Simply connect your repository and set the environment variables in the platform's dashboard.
