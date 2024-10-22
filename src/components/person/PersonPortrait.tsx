import { getImg } from "@/lib/helpers";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

type Props = {
  profile_path: string;
  name: string;
};

export default function PersonPortrait({ profile_path, name }: Props) {
  return (
    <div className="w-64 max-md:w-52 max-xsm:self-center max-sm:w-44">
      <AspectRatio ratio={2 / 3}>
        <img
          src={getImg(profile_path, "w780")}
          alt={"Image of " + name}
          className="object-cover rounded-lg w-full h-full"
        />
      </AspectRatio>
    </div>
  );
}
