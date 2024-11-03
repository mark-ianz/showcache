import { getKeywords } from "@/api/show.service";
import { ShowType } from "@/types/show";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Badge } from "../ui/badge";

type Props = {
  type: ShowType;
  id: string | number;
};

export default function Keywords({ type, id }: Props) {
  const { data: keywords } = useQuery({
    queryKey: ["keywords", type, id],
    queryFn: getKeywords,
    staleTime: 1000 * 60 * 5,
  });

  return keywords?.length === 0 ? (
    <p>No keywords found</p>
  ) : (
    <div className="flex flex-wrap gap-2 mt-2">
      {keywords?.map((keyword, index) => (
        <Badge
          variant={"secondary"}
          className="text-gray-500 px-2 py-1"
          key={keyword + index}
        >
          {keyword}
        </Badge>
      ))}
    </div>
  );
}
