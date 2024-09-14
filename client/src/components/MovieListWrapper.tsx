import { ReactNode } from "react";

export default function MovieListWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-9 gap-4">
      {children}
    </ul>
  );
}
