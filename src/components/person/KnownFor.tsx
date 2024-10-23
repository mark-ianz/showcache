import { getCombinedCredits } from "@/api/show.service";
import { useLanguage } from "@/context/language-provider";
import { getShowName } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";

type Props = { id: number };

export default function KnownFor({ id }: Props) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data } = useQuery({
    queryKey: ["known_for", language, id],
    queryFn: getCombinedCredits,
    staleTime: 1000 * 60 * 5,
  });

  console.log(data);
  return (
    <div>
      <div>
        {data?.map((show) => (
          <p key={show.id}>{getShowName(show)}</p>
        ))}
      </div>
    </div>
  );
}
