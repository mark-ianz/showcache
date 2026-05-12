import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import { ThemeProvider } from "./theme-provider.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./context/language-provider.tsx";
import { TooltipProvider } from "./components/ui/tooltip";
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
import MediaListPage from "./pages/MediaListPage.tsx";
import PeoplePage from "./pages/PeoplePage.tsx";
import AuthCallback from "./pages/AuthCallback.tsx";
import Profile from "./pages/Profile.tsx";
import ManageList from "./pages/ManageList.tsx";

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
        element: <MediaListPage category="trending" />,
      },
      {
        path: "/trending/:type",
        element: <MediaListPage />,
      },
      {
        path: "/new",
        element: <MediaListPage category="new" />,
      },
      {
        path: "/movie",
        element: <MediaListPage />,
      },
      {
        path: "/movie/popular",
        element: <MediaListPage category="popular" />,
      },
      {
        path: "/movie/now-playing",
        element: <MediaListPage category="now-playing" />,
      },
      {
        path: "/movie/upcoming",
        element: <MediaListPage category="upcoming" />,
      },
      {
        path: "/movie/top-rated",
        element: <MediaListPage category="top-rated" />,
      },
      {
        path: "/movie/:id",
        element: <ViewMoviePage />,
      },
      {
        path: "/tv/popular",
        element: <MediaListPage category="popular" />,
      },
      {
        path: "/tv/airing-today",
        element: <MediaListPage category="airing-today" />,
      },
      {
        path: "/tv/on-the-air",
        element: <MediaListPage category="on-the-air" />,
      },
      {
        path: "/tv/upcoming",
        element: <MediaListPage category="upcoming" />,
      },
      {
        path: "/tv/top-rated",
        element: <MediaListPage category="top-rated" />,
      },
      {
        path: "/tv/:id",
        element: <ViewTvPage />,
      },
      {
        path: "/tv",
        element: <MediaListPage />,
      },
      {
        path: "/person",
        element: <PeoplePage />,
      },
      {
        path: "/results",
        element: <ResultsPage />,
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
        path: "/auth/callback",
        element: <AuthCallback />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/list/:id",
        element: <ManageList />,
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
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>
);
