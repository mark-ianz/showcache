import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import { ThemeProvider } from "./theme-provider.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./context/language-provider.tsx";
import TopRatedPage from "./pages/TopRated.tsx";
import PopularMoviesPage from "./pages/PopularMovies.tsx";
import NewReleasesPage from "./pages/NewReleases.tsx";
import TvShowsPage from "./pages/Tv.tsx";
import UpcomingMoviesPage from "./pages/UpcomingMovies.tsx";
import ResultsPage from "./pages/Results.tsx";
import ViewMoviePage from "./pages/ViewMovie.tsx";
import ViewTvPage from "./pages/ViewTv.tsx";
import ViewPersonPage from "./pages/ViewPerson.tsx";
import ViewPersonMediaPage from "./pages/ViewPersonMedia.tsx";
import ViewCollectionPage from "./pages/ViewCollection.tsx";
import ContactPage from "./pages/Contact.tsx";
import AboutPage from "./pages/About.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicy.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import ViewShowMediaPage from "./pages/ViewShowMedia.tsx";
import TrendingPage from "./pages/Trending.tsx";
import AllMoviesPage from "./pages/Movies.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Layout>
        <PageNotFound />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/trending",
        element: <TrendingPage />,
      },
      {
        path: "/movies",
        element: <AllMoviesPage />,
      },
      {
        path: "/movie",
        element: <AllMoviesPage />,
      },
      {
        path: "/top_rated",
        element: <TopRatedPage />,
      },
      {
        path: "/popular",
        element: <PopularMoviesPage />,
      },
      {
        path: "/new",
        element: <NewReleasesPage />,
      },
      {
        path: "/tv",
        element: <TvShowsPage />,
      },
      {
        path: "/upcoming",
        element: <UpcomingMoviesPage />,
      },
      {
        path: "/results",
        element: <ResultsPage />,
      },
      {
        path: "/movie/:id",
        element: <ViewMoviePage />,
      },
      {
        path: "/tv/:id",
        element: <ViewTvPage />,
      },
      {
        path: "/person/:id",
        element: <ViewPersonPage />,
      },
      {
        path: "/collection/:id",
        element: <ViewCollectionPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/media/person/:id/:name",
        element: <ViewPersonMediaPage />,
      },
      {
        path: "/media/:type/:id/:title",
        element: <ViewShowMediaPage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>
);
