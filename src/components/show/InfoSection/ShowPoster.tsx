import { getImg } from "@/lib/helpers";

type Props = { poster_path: string };

export default function ShowPoster({ poster_path }: Props) {
  const poster_path_src = getImg({path: poster_path, size: "w780", mediaType: "show"});

  return (
    <div className="w-72 max-xsm:w-56">
      {poster_path_src && (
        <img
          src={poster_path_src}
          className="object-cover rounded-lg min-w-60 max-md:min-w-0"
        />
      )}
    </div>
  );
}
