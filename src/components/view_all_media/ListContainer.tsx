import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function ListContainer({ children }: Props) {
  return (
    <section className="flex gap-10 justify-between max-lg:gap-6 max-md:gap-4">
      {children}
    </section>
  );
}
