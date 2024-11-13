import { getImg } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  children: ReactNode;
  backdrop_path: string;
  className?: ClassNameValue;
};

export default function SectionwBGImage({ children, backdrop_path, className }: Props) {
  const backdrop_path_src = getImg({
    path: backdrop_path,
    size: "original",
    mediaType: "show",
    undefineable: true,
  });
  return (
    <section
      className={cn("p-6 relative", className)}
      style={{
        backgroundImage: `url(${backdrop_path_src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background opacity-90 z-0"></div>
      {children}

    </section>
  );
}
