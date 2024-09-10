import ThemeSwitch from "../ThemeSwitch";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Logo from "./Logo";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between border-b pb-3 mb-4">
        <Logo />
        <div className="flex grow gap-4">
          <Input
            className="max-w-md ml-auto"
            placeholder="Search for Movies or TV Shows"
          />
          <ThemeSwitch />
          <Button>Login</Button>
        </div>
      </header>
    </>
  );
}

// Your personal show collection
