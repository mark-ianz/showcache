import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/api/account.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie, TV } from "@/types/show";
import ShowCard from "@/components/show/ShowCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigate, Link } from "react-router-dom";
import { TMDBList } from "@/types/list";

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
          <TabsList className="grid w-full max-w-[800px] grid-cols-4">
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="rated">Rated</TabsTrigger>
            <TabsTrigger value="lists">My Lists</TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="mt-6">
            <MediaGrid account={account!} type="favorite" />
          </TabsContent>

          <TabsContent value="watchlist" className="mt-6">
            <MediaGrid account={account!} type="watchlist" />
          </TabsContent>

          <TabsContent value="rated" className="mt-6">
            <MediaGrid account={account!} type="rated" />
          </TabsContent>

          <TabsContent value="lists" className="mt-6">
            <ListsGrid account={account!} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MediaGrid({ account, type }: { account: any, type: "favorite" | "watchlist" | "rated" }) {
  const { data: movies, isLoading: moviesLoading } = useQuery({
    queryKey: [type, "movies", account.access_token, account.account_id],
    queryFn: () => accountService.getV4PersonalizedList(
      account.access_token,
      account.account_id,
      type,
      "movies"
    ).then(res => res.results as Movie[]),
  });

  const { data: tvShows, isLoading: tvLoading } = useQuery({
    queryKey: [type, "tv", account.access_token, account.account_id],
    queryFn: () => accountService.getV4PersonalizedList(
      account.access_token,
      account.account_id,
      type,
      "tv"
    ).then(res => res.results as TV[]),
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
      {allItems.map((item) => {
        const isMovie = 'title' in item;
        const name = isMovie ? item.title : item.name;
        const release_date = isMovie ? item.release_date : item.first_air_date;
        const media_type = isMovie ? 'movie' : 'tv';

        return (
          <ShowCard
            key={item.id}
            id={item.id}
            mediaType={media_type}
            name={name}
            image_path={item.poster_path}
            vote_average={item.vote_average}
            genre_ids={item.genre_ids}
            release_date={release_date}
            path={`/${media_type}/${item.id}`}
          />
        );
      })}
    </div>
  );
}
function ListsGrid({ account }: { account: any }) {
  const { data: lists, isLoading } = useQuery({
    queryKey: ["lists", account.access_token, account.account_id],
    queryFn: () => accountService.getAccountLists(
      account.access_token,
      account.account_id
    ).then(res => res.results as TMDBList[]),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!lists || lists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border rounded-2xl bg-muted/30">
        <p className="text-xl font-medium">No lists found</p>
        <p className="text-muted-foreground mt-1">You haven't created any lists on TMDB yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map((list) => (
        <Link 
          key={list.id} 
          to={`/list/${list.id}`}
          className="group relative overflow-hidden rounded-2xl border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        >
          <div className="aspect-video w-full overflow-hidden bg-muted">
            {list.backdrop_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w500${list.backdrop_path}`} 
                alt={list.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <span className="text-4xl font-bold text-primary/40">{list.name[0]}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          </div>
          
          <div className="p-5 relative -mt-12">
            <div className="flex items-end gap-4">
              {list.poster_path && (
                <div className="h-24 w-16 overflow-hidden rounded-lg border-2 border-background shadow-lg shrink-0">
                  <img 
                    src={`https://image.tmdb.org/t/p/w185${list.poster_path}`} 
                    alt={list.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="mb-2">
                <h3 className="text-xl font-bold line-clamp-1">{list.name}</h3>
                <p className="text-sm text-muted-foreground">{list.item_count} items • {list.public ? 'Public' : 'Private'}</p>
              </div>
            </div>
            {list.description && (
              <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{list.description}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
