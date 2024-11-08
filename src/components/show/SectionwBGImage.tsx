import { getImg } from "@/lib/helpers";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  backdrop_path: string;
};

export default function SectionwBGImage({ children, backdrop_path }: Props) {
  const backdrop_path_src = getImg({
    path: backdrop_path,
    size: "original",
    mediaType: "show",
    undefineable: true,
  });
  return (
    <section
      className="p-6 relative"
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
