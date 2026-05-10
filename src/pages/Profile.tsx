import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/api/account.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie, TV } from "@/types/show";
import ShowCard from "@/components/show/ShowCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { axios_config } from "@/api/axios.config";

export default function Profile() {
  const { account, isLoggedIn, loading } = useAuth();

  if (loading) return <div className="p-10">Loading profile...</div>;
  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your TMDB favorites and watchlist.</p>
        </div>

        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="favorites" className="mt-6">
            <MediaGrid account={account!} type="favorite" />
          </TabsContent>
          
          <TabsContent value="watchlist" className="mt-6">
            <MediaGrid account={account!} type="watchlist" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MediaGrid({ account, type }: { account: any, type: "favorite" | "watchlist" }) {
  const { data: movies, isLoading: moviesLoading } = useQuery({
    queryKey: [type, "movies", account.access_token],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/account/null/${type}/movies`,
        axios_config({ 
          method: "GET",
          headers: { Authorization: `Bearer ${account.access_token}` }
        })
      );
      return data.results as Movie[];
    },
  });

  const { data: tvShows, isLoading: tvLoading } = useQuery({
    queryKey: [type, "tv", account.access_token],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/account/null/${type}/tv`,
        axios_config({ 
          method: "GET",
          headers: { Authorization: `Bearer ${account.access_token}` }
        })
      );
      return data.results as TV[];
    },
  });

  if (moviesLoading || tvLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3] rounded-xl" />
        ))}
      </div>
    );
  }

  const allItems = [...(movies || []), ...(tvShows || [])].sort((a, b) => b.vote_average - a.vote_average);

  if (allItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border rounded-2xl bg-muted/30">
        <p className="text-xl font-medium">Nothing here yet</p>
        <p className="text-muted-foreground mt-1">Start adding items to your {type}!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {allItems.map((item) => (
        <ShowCard key={item.id} show={item} />
      ))}
    </div>
  );
}
