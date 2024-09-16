import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import { ThemeProvider } from "./theme-provider.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./components/context/language-provider.tsx";
import TopRated from "./pages/TopRated.tsx";
import Popular from "./pages/Popular.tsx";
import New from "./pages/New.tsx";
import Tv from "./Tv.tsx";
import Upcoming from "./pages/Upcoming.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
