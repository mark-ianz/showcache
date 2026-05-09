import { Button } from "@/components/ui/button";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function PageNotFound() {
  const error = useRouteError();
  console.error(error);

  let errorMessage = "The page you are looking for does not exist.";
  let errorStatus = "404";

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status.toString();
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorStatus = "Error";
  }

  return (
    <main>
      <section className="flex flex-col items-center justify-center mt-10">
        <span className="text-4xl font-bold mb-4 text-center">
          <p>{errorStatus}</p>
          <p>{errorStatus === "404" ? "Page not found" : "Unexpected Error"}</p>
        </span>
        <hr className="w-full border-t-2 border-primary-foreground my-4" />
        <p className="text-lg mb-8 text-center max-sm:text-base text-muted-foreground">
          {errorMessage}
        </p>
        <Button asChild variant={"ghost"}>
          <Link to="/">Go to Home</Link>
        </Button>
      </section>
    </main>
  );
}
