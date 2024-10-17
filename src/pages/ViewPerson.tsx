import { getPersonFullInfo } from "@/api/credits.service";
import { useLanguage } from "@/context/language-provider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type Props = {};

export default function ViewPerson({}: Props) {
  const { id } = useParams();
  const {
    language: { iso_639_1: language },
  } = useLanguage();
  const { data } = useQuery({
    queryKey: ["person", language, id],
    queryFn: getPersonFullInfo,
    staleTime: 1000 * 60 * 5,
  });

  console.log(data);

  return <div>ViewPerson</div>;
}
