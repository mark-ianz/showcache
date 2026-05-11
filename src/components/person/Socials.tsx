import { getExternalIds } from "@/api/show.service";
import { external_ids_link, external_ids_logo } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalIds, ValidExternalIds } from "@/types/credits";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ClassNameValue } from "tailwind-merge";
import { Globe } from "lucide-react";

type Props = {
  id: number | string;
  type: "movie" | "tv" | "person";
  homepage?: string;
  className?: ClassNameValue;
};

export default function Socials({ id, type, homepage, className }: Props) {
  const { data } = useQuery({
    queryKey: ["external_ids", type, id],
    queryFn: getExternalIds,
    staleTime: 1000 * 60 * 5,
  });

  const socials = [];

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
    <div className={cn("flex flex-wrap gap-4 items-center", className)}>
      {homepage && (
        <Link
          to={homepage}
          target="_blank"
          className="w-8 aspect-square max-md:w-6 flex items-center justify-center hover:opacity-80 transition-opacity"
          title="Official Homepage"
        >
          <Globe className="w-full h-full text-gray-500" />
        </Link>
      )}
      {socials.length > 0 && (
        <ul className="flex flex-wrap gap-4">
          {socials.map((social, index) => (
            <li
              key={social.name + index}
              className="w-8 aspect-square max-md:w-6 hover:opacity-80 transition-opacity"
            >
              <Link to={social.link} target="_blank" title={social.name}>
                <img
                  src={social.logo}
                  alt={"Social Link with" + social.name}
                  className="w-full h-full"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
