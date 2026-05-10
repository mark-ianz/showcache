import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import { ThemeProvider } from "./theme-provider.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./context/language-provider.tsx";
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
        path: "/trending/:type",
        element: <MediaListPage />,
      },
      {
        path: "/movie",
        element: <MediaListPage />,
      },
      {
        path: "/movie/:category",
        element: <MediaListPage />,
      },
      {
        path: "/tv",
        element: <MediaListPage />,
      },
      {
        path: "/tv/:category",
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
