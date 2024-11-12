import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Nav from "./components/header/nav/Nav";
import Footer from "./components/Footer";
import { ReactNode } from "react";

export default function Layout({children}: {children?: ReactNode}) {
  return (
    <div className="wrapper py-4 px-40 flex flex-col items-center justify-center max-2xl:px-[8vw] max-lg:px-[4vw]">
      <>
        <Header />
        <Nav />
        <Outlet />
        {children}
        <Footer />
      </>
    </div>
  );
}
