import Logo from "./Logo";
import Searchbar from "./Searchbar";


export default function Header() {
  return (
    <header className="glass-header h-16 flex items-center">
      <div className="max-w-[1280px] mx-auto w-full px-6 flex items-center justify-between gap-8">
        <Logo className="shrink-0" />
        <div className="flex-1 max-w-xl">
          <Searchbar />
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {/* Main category links could also go here if preferred */}
        </div>
      </div>
    </header>
  );
}

