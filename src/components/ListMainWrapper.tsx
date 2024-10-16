import { ReactNode } from "react";

export default function ListMainWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col gap-20 max-w-screen-2xl w-full">{children}</main>
  );
}
