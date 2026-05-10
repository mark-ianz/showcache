import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import { ReactNode } from "react";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <main>
          <Outlet />
          {children}
        </main>
      </div>
      <ScrollRestoration />
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

