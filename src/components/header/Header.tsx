import Logo from "./Logo";
import Menu from "./Menu";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <>
      <header className="flex flex-col w-full max-md:pb-5">
        <div className="flex items-center justify-between w-full mb-4">
          <Logo className={"mr-20"} />
          <div className="flex grow gap-4 items-center justify-end">
            <Searchbar className="max-md:hidden" />
            <Menu />
          </div>
        </div>
        <div className="grow hidden max-md:flex">
          <Searchbar className="ml-0 max-w-none"/>
        </div>
      </header>
    </>
  );
}
