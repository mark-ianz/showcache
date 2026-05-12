import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "@/api/account.service";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Star, MoreHorizontal, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AddToList from "./AddToList";

interface AccountActionsMenuProps {
  mediaType: "movie" | "tv";
  mediaId: number;
  className?: string;
  onRemove?: () => void;
  removeLabel?: string;
}

export default function AccountActionsMenu({ 
  mediaType, 
  mediaId, 
  className,
  onRemove,
  removeLabel
}: AccountActionsMenuProps) {
  const { account, isLoggedIn, login } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const { data: states, isLoading: isStatesLoading } = useQuery({
    queryKey: ["account_states", mediaType, mediaId, account?.access_token],
    queryFn: () => accountService.getAccountStates(account!.access_token, mediaType, mediaId),
    enabled: !!account?.access_token && isOpen,
  });

  const favoriteMutation = useMutation({
    mutationFn: (favorite: boolean) =>
      accountService.markAsFavorite(account!.access_token, account!.account_id, mediaType, mediaId, favorite),
    onSuccess: (_, favorite) => {
      toast({
        title: favorite ? "Added to Favorites" : "Removed from Favorites",
        description: `Successfully updated favorites.`,
      });
      queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
    }
  });

  const watchlistMutation = useMutation({
    mutationFn: (watchlist: boolean) =>
      accountService.addToWatchlist(account!.access_token, account!.account_id, mediaType, mediaId, watchlist),
    onSuccess: (_, watchlist) => {
      toast({
        title: watchlist ? "Added to Watchlist" : "Removed from Watchlist",
        description: `Successfully updated watchlist.`,
      });
      queryClient.invalidateQueries({ queryKey: ["account_states", mediaType, mediaId] });
    }
  });

  if (!isLoggedIn) {
    return (
      <Button 
        variant="secondary" 
        size="icon" 
        className={cn("rounded-full w-8 h-8 bg-black/40 hover:bg-black/60 text-white border-none", className)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          login();
        }}
      >
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="secondary" 
            size="icon" 
            className={cn("rounded-full w-8 h-8 bg-black/40 hover:bg-black/60 text-white border-none transition-all", isOpen && "bg-primary text-white", className)}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
      <PopoverContent 
        className="w-48 p-1 backdrop-blur-xl bg-background/80 border-border/50 shadow-2xl rounded-xl" 
        align="end"
        sideOffset={5}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          {/* Add to List - This will need to be handled carefully as it opens another popover */}
          <div className="p-1">
             <AddToList 
              mediaType={mediaType} 
              mediaId={mediaId} 
              showLabel
              className="w-full justify-start gap-3 h-9 text-xs font-medium bg-transparent border-none hover:bg-accent rounded-lg px-3"
             />
          </div>

          <MenuButton 
            icon={<Heart className={cn("w-4 h-4", states?.favorite && "fill-red-500 text-red-500")} />}
            label="Favorite"
            active={states?.favorite}
            onClick={() => favoriteMutation.mutate(!states?.favorite)}
            loading={favoriteMutation.isPending || isStatesLoading}
          />

          <MenuButton 
            icon={<Bookmark className={cn("w-4 h-4", states?.watchlist && "fill-primary text-primary")} />}
            label="Watchlist"
            active={states?.watchlist}
            onClick={() => watchlistMutation.mutate(!states?.watchlist)}
            loading={watchlistMutation.isPending || isStatesLoading}
          />

          <MenuButton 
            icon={<Star className={cn("w-4 h-4", states?.rated && "fill-yellow-500 text-yellow-500")} />}
            label={states?.rated ? `Rated ${states.rated.value}` : "Your rating"}
            active={!!states?.rated}
            onClick={() => {
              // For simplicity in the menu, we'll just navigate to detail page for rating
              // or we could implement a nested rating selector.
              // Let's just show the rating status for now.
              toast({ title: "Rating", description: "Open title details to change your rating." });
            }}
            loading={isStatesLoading}
          />

          {onRemove && (
            <>
              <div className="h-px bg-border/50 my-1" />
              <MenuButton 
                icon={<Trash2 className="w-4 h-4" />}
                label={removeLabel || "Remove from list"}
                onClick={onRemove}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              />
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
    </div>
  );
}

function MenuButton({ icon, label, active, onClick, loading, className }: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean, 
  onClick: () => void,
  loading?: boolean,
  className?: string
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "w-full justify-start gap-3 h-9 text-xs font-medium rounded-lg px-3",
        active && "bg-accent/50 text-accent-foreground",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      disabled={loading}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {label}
    </Button>
  );
}
