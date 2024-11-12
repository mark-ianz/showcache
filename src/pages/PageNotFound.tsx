import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main>
      <section  className="flex flex-col items-center justify-center mt-10">
        <span className="text-4xl font-bold mb-4 text-center">
          <p>404</p>
          <p>Page not found</p>
        </span>
        <hr className="w-full border-t-2 border-primary-foreground my-4" />
        <p className="text-lg mb-8 text-center max-sm:text-base">
          The page you are looking for does not exist.
        </p>
        <Button asChild variant={"ghost"}>
          <Link to="/">Go to Home</Link>
        </Button>
      </section>
    </main>
  );
}
