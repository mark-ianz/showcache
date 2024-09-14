import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Header/Nav";

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
