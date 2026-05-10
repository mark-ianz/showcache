import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "@/api/account.service";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Loader2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AccountActionsProps {
  mediaType: "movie" | "tv";
  mediaId: number;
  className?: string;
}

export default function AccountActions({ mediaType, mediaId, className }: AccountActionsProps) {
  const { account, isLoggedIn, login } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const { data: states, isLoading } = useQuery({
    queryKey: ["account_states", mediaType, mediaId, account?.access_token],
    queryFn: () => accountService.getAccountStates(account!.access_token, mediaType, mediaId),
    enabled: !!account?.access_token,
  });

  const favoriteMutation = useMutation({
    mutationFn: (favorite: boolean) => 
      accountService.markAsFavorite(account!.access_token, account!.account_id, mediaType, mediaId, favorite),
    onSuccess: (_, favorite) => {
      queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
      toast({
        title: favorite ? "Added to Favorites" : "Removed from Favorites",
        description: `Successfully ${favorite ? "added to" : "removed from"} favorites.`,
      });
    }
  });

  const watchlistMutation = useMutation({
    mutationFn: (watchlist: boolean) => 
      accountService.addToWatchlist(account!.access_token, account!.account_id, mediaType, mediaId, watchlist),
    onSuccess: (_, watchlist) => {
      queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
      toast({
        title: watchlist ? "Added to Watchlist" : "Removed from Watchlist",
        description: `Successfully ${watchlist ? "added to" : "removed from"} watchlist.`,
      });
    }
  });

  const ratingMutation = useMutation({
    mutationFn: (value: number) => 
      accountService.addRating(account!.access_token, mediaType, mediaId, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
      setIsRatingOpen(false);
      toast({
        title: "Rating Saved",
        description: "Your rating has been submitted successfully.",
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

  const handleRate = (value: number) => {
    if (!isLoggedIn) return login();
    ratingMutation.mutate(value);
  };

  if (isLoading && isLoggedIn) {
    return (
      <div className={cn("flex gap-2", className)}>
        {[1, 2, 3].map((i) => (
          <Button key={i} variant="outline" size="icon" disabled className="rounded-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", className)}>
      {/* Favorite Button */}
      <Tooltip>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent>
          <p>{states?.favorite ? "Remove from favorites" : "Add to favorites"}</p>
        </TooltipContent>
      </Tooltip>

      {/* Watchlist Button */}
      <Tooltip>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent>
          <p>{states?.watchlist ? "Remove from watchlist" : "Add to watchlist"}</p>
        </TooltipContent>
      </Tooltip>

      {/* Rating Button */}
      <Tooltip>
        <Popover open={isRatingOpen} onOpenChange={setIsRatingOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={cn(
                  "rounded-full transition-colors", 
                  states?.rated && "text-yellow-500 border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20"
                )}
                onClick={() => !isLoggedIn && login()}
              >
                <Star className={cn("w-4 h-4", states?.rated && "fill-current")} />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{states?.rated ? `Your rating: ${states.rated.value}/10` : "Rate this"}</p>
          </TooltipContent>
          <PopoverContent className="w-fit p-3" align="start">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium px-1 text-muted-foreground uppercase tracking-wider">Rate this {mediaType}</p>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleRate(i + 1)}
                    disabled={ratingMutation.isPending}
                    className={cn(
                      "w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-all hover:scale-110",
                      (states?.rated?.value || 0) >= i + 1 
                        ? "bg-yellow-500 text-white" 
                        : "bg-muted hover:bg-yellow-500/20 hover:text-yellow-500"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </div>
  );
}
