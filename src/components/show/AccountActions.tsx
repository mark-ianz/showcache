import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "@/api/account.service";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AccountActionsProps {
  mediaType: "movie" | "tv";
  mediaId: number;
  className?: string;
}

export default function AccountActions({ mediaType, mediaId, className }: AccountActionsProps) {
  const { account, isLoggedIn, login } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: states, isLoading } = useQuery({
    queryKey: ["account_states", mediaType, mediaId, account?.access_token],
    queryFn: () => accountService.getAccountStates(account!.access_token, mediaType, mediaId),
    enabled: !!account?.access_token,
  });

  const favoriteMutation = useMutation({
    mutationFn: (favorite: boolean) => 
      accountService.markAsFavorite(account!.access_token, mediaType, mediaId, favorite),
    onSuccess: (_, favorite) => {
      queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
      toast({
        title: favorite ? "Added to Favorites" : "Removed from Favorites",
        description: `This ${mediaType} has been ${favorite ? "added to" : "removed from"} your favorites.`,
      });
    }
  });

  const watchlistMutation = useMutation({
    mutationFn: (watchlist: boolean) => 
      accountService.addToWatchlist(account!.access_token, mediaType, mediaId, watchlist),
    onSuccess: (_, watchlist) => {
      queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
      toast({
        title: watchlist ? "Added to Watchlist" : "Removed from Watchlist",
        description: `This ${mediaType} has been ${watchlist ? "added to" : "removed from"} your watchlist.`,
      });
    }
  });

  const handleFavorite = () => {
    if (!isLoggedIn) return login();
    favoriteMutation.mutate(!states?.favorite);
  };

  const handleWatchlist = () => {
    if (!isLoggedIn) return login();
    watchlistMutation.mutate(!states?.watchlist);
  };

  if (isLoading && isLoggedIn) {
    return (
      <div className={cn("flex gap-2", className)}>
        <Button variant="outline" size="icon" disabled className="rounded-full">
          <Loader2 className="w-4 h-4 animate-spin" />
        </Button>
        <Button variant="outline" size="icon" disabled className="rounded-full">
          <Loader2 className="w-4 h-4 animate-spin" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Button 
        variant="outline" 
        size="icon" 
        className={cn(
          "rounded-full transition-colors", 
          states?.favorite && "text-red-500 border-red-500/50 bg-red-500/10 hover:bg-red-500/20"
        )}
        onClick={handleFavorite}
        disabled={favoriteMutation.isPending}
      >
        <Heart className={cn("w-4 h-4", states?.favorite && "fill-current")} />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        className={cn(
          "rounded-full transition-colors", 
          states?.watchlist && "text-primary border-primary/50 bg-primary/10 hover:bg-primary/20"
        )}
        onClick={handleWatchlist}
        disabled={watchlistMutation.isPending}
      >
        <Bookmark className={cn("w-4 h-4", states?.watchlist && "fill-current")} />
      </Button>
    </div>
  );
}
