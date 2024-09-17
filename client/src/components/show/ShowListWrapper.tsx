import { ReactNode } from "react";

export default function ShowListWrapper({ children }: { children: ReactNode }) {
  return (
    <ul className="grid gap-6 grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-2">
      {children}
    </ul>
  );
}
