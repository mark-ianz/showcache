import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import { ThemeProvider } from "./theme-provider.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./context/language-provider.tsx";
import TopRated from "./pages/TopRated.tsx";
import Popular from "./pages/PopularMovies.tsx";
import New from "./pages/NewReleases.tsx";
import Tv from "./pages/Tv.tsx";
import Upcoming from "./pages/UpcomingMovies.tsx";
import Results from "./pages/Results.tsx";
import ViewShow from "./pages/ViewMovie.tsx";
import ViewTv from "./pages/ViewTv.tsx";
import ViewPerson from "./pages/ViewPerson.tsx";
import ViewPersonMedia from "./pages/ViewPersonMedia.tsx";
import ViewCollection from "./pages/ViewCollection.tsx";
import Contact from "./pages/Contact.tsx";
import About from "./pages/About.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Layout>
        <PageNotFound/>
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "top_rated",
        element: <TopRated />,
      },
      {
        path: "/popular",
        element: <Popular />,
      },
      {
        path: "/new",
        element: <New />,
      },
      {
        path: "/tv",
        element: <Tv />,
      },
      {
        path: "/upcoming",
        element: <Upcoming />,
      },
      {
        path: "/results",
        element: <Results />,
      },
      {
        path: "/movie/:id",
        element: <ViewShow />,
      },
      {
        path: "/tv/:id",
        element: <ViewTv />,
      },
      {
        path: "/person/:id",
        element: <ViewPerson />,
      },
      {
        path: "/person/:id/media",
        element: <ViewPersonMedia />,
      },
      {
        path: "/collection/:id",
        element: <ViewCollection />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
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
