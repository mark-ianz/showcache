import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function ContactUsLink({ children }: { children: ReactNode }) {
  return (
    <Link to={"/contact"} className="text-tertiary hover:underline">
      {" "}{children}{" "}
    </Link>
  );
}
