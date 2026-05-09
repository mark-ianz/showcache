import { Link } from "react-router-dom";
import Logo from "./header/Logo";

export default function Footer() {
  const links = [
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "Privacy Policy", url: "/privacy" },
  ];

  return (
    <footer className="mt-20 py-12 border-t border-border/50 bg-muted/30">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo className="opacity-50 grayscale hover:grayscale-0 transition-all" />
          <p className="text-xs text-muted-foreground">
            Professional movie data database for cinema enthusiasts.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.url}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} ShowCache. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
