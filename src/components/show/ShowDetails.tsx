import HeaderText from "../HeaderText";
import InfoItem from "../InfoItem";
import { languages } from "@/constants/languages";
import { formatCurrency, formatDate, getShowType } from "@/lib/helpers";
import Keywords from "./Keywords";
import { useLanguage } from "@/context/language-provider";
import { useCurrencyRates } from "@/hooks/useCurrency";
import { ShowFullDetails } from "@/types/show";

type Props = { showData: ShowFullDetails };

export default function ShowDetails({ showData }: Props) {
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  const { data: conversions, isLoading } = useCurrencyRates();

  const type = getShowType(showData);

  const arrayDetails = [
    { info: "Status", item: showData.status },
    {
      info: "Original Language",
      item:
        languages.find((lang) => lang.iso_639_1 === showData.original_language)
          ?.name || null,
    },
    // Movie specific details
    ...(type === "movie"
      ? [
          {
            info: "Budget",
            item: formatCurrency(
              (showData as any).budget,
              language,
              conversions,
              isLoading
            ),
          },
          {
            info: "Revenue",
            item: formatCurrency(
              (showData as any).revenue,
              language,
              conversions,
              isLoading
            ),
          },
          {
            info: `Released Date`,
            item: formatDate((showData as any).release_date),
          },
          {
            info: "Runtime",
            item: (showData as any).runtime
              ? `${(showData as any).runtime} minutes`
              : null,
          },
        ]
      : [
          // TV specific details
          { info: "Type", item: (showData as any).type },
          {
            info: "Networks",
            item: (showData as any).networks
              ?.map((n: any) => n.name)
              .join(", "),
          },
          {
            info: "Created By",
            item: (showData as any).created_by
              ?.map((c: any) => c.name)
              .join(", "),
          },
          {
            info: "First Air Date",
            item: formatDate((showData as any).first_air_date),
          },
          {
            info: "Seasons",
            item: (showData as any).number_of_seasons,
          },
          {
            info: "Episodes",
            item: (showData as any).number_of_episodes,
          },
        ]),
    {
      info: "Keywords",
      item: <Keywords type={type} id={showData.id} />,
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
