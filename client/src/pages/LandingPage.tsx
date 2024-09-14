import { useQuery } from "@tanstack/react-query";
import { getNewReleases, getTrendingThisWeek } from "@/utils/api";
import MovieSection from "@/components/MovieSection";

export type Movie = {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function LandingPage() {
  const { data: trending_this_week } = useQuery({
    queryKey: ["trending_this_week"],
    queryFn: getTrendingThisWeek,
    staleTime: 1000 * 60 * 5,
  });

  const { data: new_releases } = useQuery({
    queryKey: ["new_releases"],
    queryFn: getNewReleases,
    staleTime: 1000 * 60 * 5,
  });

  const trending: Movie[] = trending_this_week?.results;
  const newReleases: Movie[] = new_releases?.results;

  return (
    <main className="flex flex-col gap-20">
      <MovieSection movieArray={trending} title="Trending This Week" />
      <MovieSection movieArray={newReleases} title="New Releases" />
    </main>
  );
}
