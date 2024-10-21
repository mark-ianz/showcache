import { getPersonExternalIds } from "@/api/credits.service";
import { external_ids_link, external_ids_logo } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalIds, ValidExternalIds } from "@/types/credits";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  person_id: number;
  className?: ClassNameValue;
};

export default function Socials({ person_id, className }: Props) {
  const { data } = useQuery({
    queryKey: ["external_ids", person_id],
    queryFn: getPersonExternalIds,
    staleTime: 1000 * 60 * 5,
  });

  let socials = [];

  // Loop through the data
  for (const social in data) {
    // If the data.social is not empty
    if (data[social as keyof ExternalIds]) {
      // Check if the social link is part of the ValidExternalIds (because I only displaying fb, ig, tiktok, twitter and youtube links)
      if (social in external_ids_logo) {
        // If valid push them into socials
        socials.push({
          name: social,
          // Will reference the link with external_ids_link
          link:
            external_ids_link[social as keyof ValidExternalIds] +
            data[social as keyof ExternalIds],
          // Will reference the logo with external_ids_logo
          logo: external_ids_logo[social as keyof ValidExternalIds],
        });
      }
    }
  }

  return (
    <ul className={cn("flex flex-wrap gap-4", className)}>
      {socials.map((social, index) => (
        <li key={social.name + index} className="w-8 h-8">
          <Link to={social.link} target="_blank">
            <img
              src={social.logo}
              alt={"Social Link with" + social.name}
              className="w-full h-full"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
