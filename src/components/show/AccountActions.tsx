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

import { motion, AnimatePresence } from "framer-motion";
import cinemaMeme from "../../assets/absolute-cinema.webp";
import AddToList from "./AddToList";

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
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [showMeme, setShowMeme] = useState(false);

  const { data: states, isLoading } = useQuery({
    queryKey: ["account_states", mediaType, mediaId, account?.access_token],
    queryFn: () => accountService.getAccountStates(account!.access_token, mediaType, mediaId),
    enabled: !!account?.access_token,
  });

  const favoriteMutation = useMutation({
    mutationFn: (favorite: boolean) =>
      accountService.markAsFavorite(account!.access_token, account!.account_id, mediaType, mediaId, favorite),
    onMutate: async (favorite) => {
      await queryClient.cancelQueries({ queryKey: ["account_states", mediaType, mediaId] });
      const previousStates = queryClient.getQueryData(["account_states", mediaType, mediaId, account?.access_token]);
      queryClient.setQueryData(["account_states", mediaType, mediaId, account?.access_token], (old: any) => ({
        ...old,
        favorite
      }));
      return { previousStates };
    },
    onError: (_err, _favorite, context: any) => {
      queryClient.setQueryData(["account_states", mediaType, mediaId, account?.access_token], context.previousStates);
    },
    onSettled: () => {
      // Delay refetch by 2 seconds to allow TMDB cache to update
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
      }, 2000);
    },
    onSuccess: (_, favorite) => {
      toast({
        title: favorite ? "Added to Favorites" : "Removed from Favorites",
        description: `Successfully ${favorite ? "added to" : "removed from"} favorites.`,
      });
    }
  });

  const watchlistMutation = useMutation({
    mutationFn: (watchlist: boolean) =>
      accountService.addToWatchlist(account!.access_token, account!.account_id, mediaType, mediaId, watchlist),
    onMutate: async (watchlist) => {
      await queryClient.cancelQueries({ queryKey: ["account_states", mediaType, mediaId] });
      const previousStates = queryClient.getQueryData(["account_states", mediaType, mediaId, account?.access_token]);
      queryClient.setQueryData(["account_states", mediaType, mediaId, account?.access_token], (old: any) => ({
        ...old,
        watchlist
      }));
      return { previousStates };
    },
    onError: (_err, _watchlist, context: any) => {
      queryClient.setQueryData(["account_states", mediaType, mediaId, account?.access_token], context.previousStates);
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
      }, 2000);
    },
    onSuccess: (_, watchlist) => {
      toast({
        title: watchlist ? "Added to Watchlist" : "Removed from Watchlist",
        description: `Successfully ${watchlist ? "added to" : "removed from"} watchlist.`,
      });
    }
  });

  const ratingMutation = useMutation({
    mutationFn: (value: number) =>
      accountService.addRating(account!.access_token, mediaType, mediaId, value),
    onMutate: async (value) => {
      await queryClient.cancelQueries({ queryKey: ["account_states", mediaType, mediaId] });
      const previousStates = queryClient.getQueryData(["account_states", mediaType, mediaId, account?.access_token]);
      queryClient.setQueryData(["account_states", mediaType, mediaId, account?.access_token], (old: any) => ({
        ...old,
        rated: { value }
      }));
      return { previousStates };
    },
    onError: (_err, _value, context: any) => {
      queryClient.setQueryData(["account_states", mediaType, mediaId, account?.access_token], context.previousStates);
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
      }, 2000);
    },
    onSuccess: (_, value) => {
      setIsRatingOpen(false);
      if (value === 10) {
        setShowMeme(true);
        setTimeout(() => setShowMeme(false), 300);
      }
      toast({
        title: "Rating Saved",
        description: "Your rating has been submitted successfully.",
      });
    }
  });

  const clearRatingMutation = useMutation({
    mutationFn: () =>
      accountService.deleteRating(account!.access_token, mediaType, mediaId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["account_states", mediaType, mediaId] });
      const previousStates = queryClient.getQueryData(["account_states", mediaType, mediaId, account?.access_token]);
      queryClient.setQueryData(["account_states", mediaType, mediaId, account?.access_token], (old: any) => ({
        ...old,
        rated: false
      }));
      return { previousStates };
    },
    onError: (_err, _variables, context: any) => {
      queryClient.setQueryData(["account_states", mediaType, mediaId, account?.access_token], context.previousStates);
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
      }, 2000);
    },
    onSuccess: () => {
      setIsRatingOpen(false);
      toast({
        title: "Rating Cleared",
        description: "Your rating has been removed.",
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

  const handleClearRating = () => {
    if (!isLoggedIn) return login();
    clearRatingMutation.mutate();
  };

  const getRatingHsl = (val: number | null, alpha = 1) => {
    if (!val) return alpha === 1 ? "hsl(0, 0%, 50%)" : "hsla(0, 0%, 50%, 0.1)";
    // Hue from 0 (Red) to 130 (Emerald/Green)
    const hue = ((val - 1) / 9) * 130;
    return `hsla(${hue}, 85%, 55%, ${alpha})`;
  };

  const getRatingLabel = (val: number | null) => {
    if (!val) return "Unrated";
    const labels: Record<number, string> = {
      1: "Absolute Garbage",
      2: "Pure Torture",
      3: "Waste of Time",
      4: "Aggressively Mid",
      5: "It's... Fine",
      6: "Actually Watchable",
      7: "Solid Choice",
      8: "Certified Banger",
      9: "Peak Fiction",
      10: "Absolute Cinema",
    };
    return labels[val] || "Fine";
  };

  const currentDisplayRating = hoverRating !== null
    ? hoverRating
    : (states?.rated?.value || null);

  if (isLoading && isLoggedIn) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex gap-2">
          {[1, 2].map((i) => (
            <Button key={i} variant="outline" size="icon" disabled className="rounded-full w-10 h-10">
              <Loader2 className="w-4 h-4 animate-spin" />
            </Button>
          ))}
        </div>
        <div className="w-[1px] h-6 bg-border/50 mx-1" />
        <Button variant="outline" disabled className="rounded-full px-8 h-10">
          <Loader2 className="w-4 h-4 animate-spin" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex gap-2">
        {/* Favorite Button */}
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <motion.div whileTap={{ scale: 0.85 }}>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full transition-all duration-500 w-10 h-10 border-border/50",
                  states?.favorite && "text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                )}
                onClick={handleFavorite}
                disabled={favoriteMutation.isPending}
              >
                <motion.div
                  animate={states?.favorite ? {
                    scale: [1, 1.6, 1],
                    rotate: [0, 20, -20, 0]
                  } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Heart className={cn("w-4 h-4 transition-all duration-300", states?.favorite && "fill-current")} />
                </motion.div>
              </Button>
            </motion.div>
          </TooltipTrigger>
          {!isRatingOpen && (
            <TooltipContent side="bottom">
              <p>{states?.favorite ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          )}
        </Tooltip>

        {/* Watchlist Button */}
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <motion.div whileTap={{ scale: 0.85 }}>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full transition-all duration-500 w-10 h-10 border-border/50",
                  states?.watchlist && "text-primary border-primary bg-primary/10 hover:bg-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                )}
                onClick={handleWatchlist}
                disabled={watchlistMutation.isPending}
              >
                <motion.div
                  animate={states?.watchlist ? {
                    scale: [1, 1.6, 1],
                    y: [0, -4, 0]
                  } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Bookmark className={cn("w-4 h-4 transition-all duration-300", states?.watchlist && "fill-current")} />
                </motion.div>
              </Button>
            </motion.div>
          </TooltipTrigger>
          {!isRatingOpen && (
            <TooltipContent side="bottom">
              <p>{states?.watchlist ? "Remove from watchlist" : "Add to watchlist"}</p>
            </TooltipContent>
          )}
        </Tooltip>

        <AddToList mediaType={mediaType} mediaId={mediaId} />
      </div>

      <div className="w-[1px] h-6 bg-border/50 mx-1" />

      {/* Rating Button */}
      <Tooltip delayDuration={300}>
        <Popover open={isRatingOpen} onOpenChange={setIsRatingOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="default"
                  className={cn(
                    "rounded-full px-5 h-10 transition-all duration-500 flex items-center gap-2 group border-border/50",
                    !states?.rated && "hover:border-yellow-500/50 hover:bg-yellow-500/5"
                  )}
                  style={states?.rated ? {
                    color: getRatingHsl(states.rated.value),
                    borderColor: getRatingHsl(states.rated.value, 0.5),
                    backgroundColor: getRatingHsl(states.rated.value, 0.1),
                    boxShadow: `0 0 ${states.rated.value * 3}px ${getRatingHsl(states.rated.value, 0.2)}`
                  } : {}}
                  onClick={() => !isLoggedIn && login()}
                >
                  <motion.div
                    animate={states?.rated ? {
                      scale: [1, 1.4, 1],
                      rotate: [0, 45, 0]
                    } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Star 
                      className={cn("w-4 h-4 transition-transform group-hover:scale-110", states?.rated && "fill-current")} 
                      style={states?.rated ? { color: getRatingHsl(states.rated.value) } : {}}
                    />
                  </motion.div>
                  <span className="text-sm font-bold tracking-tight tabular-nums">
                    {states?.rated ? `${states.rated.value} / 10` : "Rate"}
                  </span>
                </Button>
              </motion.div>
            </PopoverTrigger>
          </TooltipTrigger>
          {!isRatingOpen && (
            <TooltipContent side="bottom">
              <p>{states?.rated ? `You've rated this ${states.rated.value}/10` : "Give a score"}</p>
            </TooltipContent>
          )}
          <PopoverContent
            className="w-[calc(100vw-2rem)] sm:w-fit p-4 sm:p-6 backdrop-blur-2xl bg-background/90 border-border/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl"
            align="center"
            sideOffset={10}
          >
            <div className="flex flex-col items-center gap-4 sm:gap-5">
              <div className="flex flex-col items-center min-w-[200px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentDisplayRating || "empty"}
                    initial={{ y: 5, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -5, opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.08, ease: "easeOut" }}
                    className={cn(
                      "text-5xl sm:text-6xl font-black tracking-tighter tabular-nums transition-colors duration-200"
                    )}
                    style={{ 
                      color: getRatingHsl(currentDisplayRating),
                      filter: `drop-shadow(0 0 ${currentDisplayRating ? currentDisplayRating * 2 : 0}px ${getRatingHsl(currentDisplayRating, 0.4)})`
                    }}
                  >
                    {currentDisplayRating || "—"}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={getRatingLabel(currentDisplayRating)}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.1 }}
                    className={cn(
                      "text-[10px] sm:text-[12px] uppercase tracking-[0.2em] font-black mt-1 transition-colors duration-200 text-center"
                    )}
                    style={{ color: getRatingHsl(currentDisplayRating, currentDisplayRating ? 0.8 : 0.3) }}
                  >
                    {getRatingLabel(currentDisplayRating)}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div 
                className="flex flex-nowrap justify-center gap-0.5 sm:gap-1 group/stars w-full" 
                onMouseLeave={() => setHoverRating(null)}
              >
                {[...Array(10)].map((_, i) => {
                  const ratingValue = i + 1;
                  const isActive = (hoverRating !== null ? hoverRating : (states?.rated?.value || 0)) >= ratingValue;

                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.3, y: -4 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRate(ratingValue)}
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      disabled={ratingMutation.isPending || clearRatingMutation.isPending}
                      className="relative p-0.5 sm:p-1 group/star flex-shrink-0"
                    >
                      <Star
                        className={cn(
                          "w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300",
                          isActive ? "fill-current" : "text-muted-foreground/20 hover:text-yellow-500/40"
                        )}
                        style={isActive ? { 
                          color: getRatingHsl(ratingValue),
                          filter: `drop-shadow(0 0 ${ratingValue > 6 ? (ratingValue - 5) * 4 : 0}px ${getRatingHsl(ratingValue, 0.5)})`
                        } : {}}
                      />
                      <motion.div
                        initial={false}
                        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 rounded-full blur-xl -z-10"
                        style={isActive ? { 
                          backgroundColor: getRatingHsl(ratingValue, 0.15),
                          opacity: ratingValue / 10 
                        } : {}}
                      />
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[11px] sm:text-[12px] text-muted-foreground/80 font-medium max-w-[200px] text-center leading-relaxed">
                  {states?.rated
                    ? "Tap a star to change your score."
                    : "Select a star to submit your rating."}
                </p>

                {states?.rated && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10 text-[10px] h-9 sm:h-8 font-black uppercase tracking-[0.15em] transition-colors rounded-full px-6 sm:px-4"
                      onClick={handleClearRating}
                      disabled={clearRatingMutation.isPending}
                    >
                      {clearRatingMutation.isPending ? "Removing..." : "Remove Rating"}
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Tooltip>

      <AnimatePresence>
        {showMeme && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
          >
            <div className="w-full max-w-[1400px] px-6">
              <img 
                src={cinemaMeme} 
                alt="Absolute Cinema" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
