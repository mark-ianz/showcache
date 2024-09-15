import { ReactNode } from "react";

export default function ShowListWrapper({ children }: { children: ReactNode }) {
  return (
    <ul className="grid grid-cols-8 max-2xl:grid-cols-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4">
      {children}
    </ul>
  );
}
