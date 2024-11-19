import { Image } from "@/types/images";
import HeaderText from "../HeaderText";
import { MediaList } from "./MediaList";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  image: Image[];
  title: string;
  mediaListClassName?: ClassNameValue;
};

export default function MediaListContainer({ image, title, mediaListClassName }: Props) {
  return (
    <div className="grow">
      <HeaderText className="mb-2 text-xl">{title}</HeaderText>
      <MediaList images={image} className={mediaListClassName}/>
    </div>
  );
}
