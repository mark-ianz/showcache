import Logo from "./Logo";
import Menu from "./Menu";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between border-b pb-3 mb-4 w-full">
        <Logo className={"mr-20"} />
        <div className="flex grow gap-4 items-center">
          <Searchbar />
          <Menu />
        </div>
      </header>
    </>
  );
}