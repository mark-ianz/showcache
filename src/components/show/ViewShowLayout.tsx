import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function ViewShowLayout({ children }: Props) {
  return (
    <main className="w-full relative flex flex-col gap-10 max-md:gap-6 max-sm:gap-4">{children}</main>
  );
}
