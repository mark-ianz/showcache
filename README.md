# ShowCache

A personal React project for browsing **movies, TV shows, people, and collections** using the [TMDB API](https://www.themoviedb.org/). Fully responsive and built to master frontend development skills, including **React**, **Tailwind CSS**, and **Shadcn UI components**.

---

## Demo

The project is deployed on Netlify: [https://showcache.netlify.app/](https://showcache.netlify.app/)

---

## UI Preview

![ShowCache Mockup](ShowCache.png)

---

## Features

- Browse movies, TV shows, people, and collections
- Fully responsive UI for mobile and desktop
- Search functionality
- Detail pages with additional information
- Smooth navigation with React Router
- UI components powered by **Shadcn** and **Radix UI**
- State management and API caching with **TanStack Query**
- Interactive carousels using `embla-carousel-react`
- Utility-first styling with **Tailwind CSS** and animations

---

## Tech Stack

**Frontend:**

- React 18  
- TypeScript  
- Tailwind CSS + Tailwind Animations  
- Shadcn UI components & Radix UI  
- TanStack Query for data fetching & caching  
- Axios for API requests  
- React Router DOM  
- Date formatting with date-fns  
- Carousel with embla-carousel-react  
- Icons via lucide-react  

**Dev Tools:**

- Vite  
- ESLint  
- PostCSS + Autoprefixer  
- TypeScript  

---

## Environment Variables

This project requires the following environment variables. Create a `.env` file in the root directory and add your keys:
 ```bash
   # Exchange Rate API Key
   VITE_EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key_here
   # Get your API key from: https://www.exchangerate-api.com/
   
   # TMDB Access Token
   VITE_TMDB_ACCESS_TOKEN_AUTH=your_tmdb_access_token_here
   # Get your API key from: https://www.themoviedb.org/settings/api
```

---

## Installation

1. Clone the repository:
 ```bash
 git clone https://github.com/mark-ianz/showcache.git
 ```
2. Install dependencies:
 ```bash
 npm install
 ```
3. Run the development server:
 ```bash
 npm run dev
 ```    
The app will be available at http://localhost:5173.
