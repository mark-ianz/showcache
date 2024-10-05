import { ReactNode } from "react";

type Props = { backdrop_path?: string; children: ReactNode };

export default function ViewInfoSectionWrapper({
  backdrop_path,
  children,
}: Props) {
  return (
    <section
      className="p-6 relative"
      style={{
        backgroundImage: `url(${backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background opacity-90 z-0"></div>
      <div className="flex gap-10 relative z-10 items-center max-md:flex-col">{children}</div>
    </section>
  );
}
