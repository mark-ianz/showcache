import HeaderText from "../HeaderText";
import { MovieFullDetails } from "@/types/movie.details";
import InfoItem from "../InfoItem";
import { languages } from "@/constants/languages";
import { formatCurrency, formatDate } from "@/lib/helpers";
import Keywords from "./Keywords";
import { useLanguage } from "@/context/language-provider";
import { useCurrencyRates } from "@/hooks/useCurrency";

type Props = { showData: MovieFullDetails };

export default function ShowDetails({ showData }: Props) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data: conversions, isLoading } = useCurrencyRates();

  const arrayDetails = [
    { info: "Status", item: showData.status },
    {
      info: "Original Language",
      item:
        languages.find((lang) => lang.iso_639_1 === showData.original_language)
          ?.name || null,
    },
    {
      info: "Budget",
      item: formatCurrency(showData.budget, language, conversions, isLoading),
    },
    {
      info: "Revenue",
      item: formatCurrency(showData.revenue, language, conversions, isLoading),
    },
    {
      info: `Release${showData.status === "Released" ? "d" : ""} Date`,
      item: formatDate(showData.release_date),
    },
    {
      info: "Runtime",
      item: showData.runtime ? `${showData.runtime} minutes` : null,
    },
    {
      info: "Keywords",
      item: <Keywords type="movie" id={showData.id} />,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <HeaderText className="font-bold text-lg">Details</HeaderText>
      {arrayDetails.map((detail, index) => (
        <InfoItem
          key={index + detail.info}
          info={detail.info}
          item={detail.item}
        />
      ))}
    </div>
  );
}
