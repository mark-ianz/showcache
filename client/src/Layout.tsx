import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Header/Nav";

export default function Layout() {
  return (
    <div className="wrapper py-4 flex items-center justify-center">
      <div className="max-w-screen-lg">
        <Header />
        <Nav />
        <Outlet />
        <footer>Footer</footer>
      </div>
    </div>
  );
}
