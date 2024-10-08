import { ReactNode } from "react";

export default function ShowListWrapper({ children }: { children: ReactNode }) {
  return (
    <ul className="grid gap-4 grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2">
      {children}
    </ul>
  );
}
