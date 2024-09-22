import no_image from "@/assets/no-image.png";

export const getImg = (
  path: string,
  size: "w300" | "w780" | "w1280" | "original"
) => {
  if (!path) {
    return no_image;
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
