import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Nav from "./components/header/Nav";

export default function Layout() {
  return (
    <div className="wrapper py-4 px-20 flex flex-col items-center justify-center">
      <>
        <Header />
        <Nav />
        <Outlet />
        <footer>Footer</footer>
      </>
    </div>
  );
}
