import Logo from "./Logo";
import Searchbar from "./Searchbar";
import NavLinks from "./nav/NavLinks";
import ThemeSwitch from "./menu/ThemeSwitch";
import LanguageSelect from "./menu/LanguageSelect";
import UserMenu from "./UserMenu";
import MobileNav from "./nav/MobileNav";


export default function Header() {
  return (
    <header className="glass-header">
      <div className="max-w-[1400px] mx-auto w-full px-4 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-8">
          <MobileNav />
          <Logo className="shrink-0 sm:scale-100 lg:scale-110" />
          <nav className="hidden lg:flex">
            <NavLinks />
          </nav>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-1 justify-end max-w-2xl">
          <div className="hidden md:block flex-1 max-w-[400px]">
            <Searchbar />
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1 border-l pl-2 lg:pl-4 ml-1">
            <div className="hidden sm:block">
              <LanguageSelect />
            </div>
            <div className="hidden sm:block">
              <ThemeSwitch />
            </div>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

