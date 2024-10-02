import { ReactNode } from "react";

type Props = { backdrop_path?: string; children: ReactNode };

export default function ViewInfoSectionWrapper({
  backdrop_path,
  children,
}: Props) {
  return (
    <section
      className="p-6"
      style={{
        backgroundImage: `url(${backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background opacity-90 z-0"></div>
      {children}
    </section>
  );
}
