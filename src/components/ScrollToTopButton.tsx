import { ArrowUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  window.addEventListener("scroll", () => {
    setScrollY(window.scrollY);
  });

  useEffect(() => {
    if (scrollY > 500) return setIsVisible(true);
    setIsVisible(false);

    return () => {
      window.removeEventListener("scroll", () => {
        setScrollY(window.scrollY);
      });
    };
  }, [scrollY]);

  return (
    isVisible && (
      <Button
        size={"icon"}
        className="rounded-full fixed bottom-10 right-10 w-12 h-12 z-50 max-md:bottom-6 max-md:right-6"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpIcon className="text-muted-foreground w-7 h-7" />
      </Button>
    )
  );
}
