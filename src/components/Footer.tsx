import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Footer() {
  const links = [
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Contact",
      url: "/contact",
    },
    {
      name: "Privacy Policy",
      url: "/privacy",
    },
  ];

  return (
    <footer className="py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex gap-4">
          {links.map((link) => (
            <Button variant={"link"} className="p-0 text-muted-foreground max-md:text-xs" asChild key={link.name}>
              <Link to={link.url}>{link.name}</Link>
            </Button>
          ))}
        </div>
        <div className="flex justify-center">
          <p className="text-sm max-md:text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ShowCache. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
