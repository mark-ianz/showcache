import { useLanguage } from "@/components/context/language-provider";
import ShowListWrapper from "@/components/show/ShowListWrapper";
import ShowSection from "@/components/show/ShowSection";
import useShows from "@/hooks/useShows";
import { getTv } from "@/lib/api";
import { LoaderIcon } from "lucide-react";
import React from "react";

export default function Tv() {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data, error, isError, isLoading } = useShows({
    queryKey: ["tv", language],
    queryFn: getTv,
  });

  if (!data || isLoading) {
    return <LoaderIcon />;
  }

  return (
    <ShowListWrapper>
      <ShowSection showArray={data} title="Top Rated" isTv />
    </ShowListWrapper>
  );
}
