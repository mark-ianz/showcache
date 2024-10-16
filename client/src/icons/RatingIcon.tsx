import { StarFilledIcon } from "@radix-ui/react-icons";

const RatingIcon = ({ color }: { color?: string }) => {
  return <StarFilledIcon color={color || "#3b82f6"} className="max-sm:w-3"/>;
};

export default RatingIcon;
