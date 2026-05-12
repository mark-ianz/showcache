import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient, useQueries } from "@tanstack/react-query";
import { accountService } from "@/api/account.service";
import { Button } from "@/components/ui/button";
import { ListPlus, Loader2, Plus, ArrowLeft, Check, ListChecks } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { TMDBList } from "@/types/list";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface AddToListProps {
  mediaType: "movie" | "tv";
  mediaId: number;
  className?: string;
}

export default function AddToList({ mediaType, mediaId, className }: AddToListProps) {
  const { account, isLoggedIn, login } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState("");

  const { data: listsData, isLoading: isListsLoading } = useQuery({
    queryKey: ["account_lists", account?.account_id],
    queryFn: () => accountService.getAccountLists(account!.access_token, account!.account_id),
    enabled: !!account?.access_token, // Always enabled so we know isInAnyList
    staleTime: 1000 * 60,
  });

  // Track status of all lists to show global state on the button
  const statusQueries = useQueries({
    queries: (listsData?.results || []).slice(0, 10).map((list: TMDBList) => ({
      queryKey: ["list_item_status", list.id, mediaType, mediaId],
      queryFn: () => accountService.checkItemInList(account!.access_token, list.id, mediaType, mediaId),
      enabled: !!account?.access_token && !!listsData,
      staleTime: 1000 * 60 * 5,
    }))
  });

  const isInAnyList = useMemo(() => 
    statusQueries.some(q => q.data?.item_present), 
    [statusQueries]
  );

  const createMutation = useMutation({
    mutationFn: () => accountService.createList(account!.access_token, newListName),
    onSuccess: (data) => {
      toast({
        title: "List Created",
        description: `"${newListName}" has been created successfully.`,
      });
      
      if (data.id) {
        queryClient.setQueryData(["account_lists", account?.account_id], (old: any) => {
          const newList = {
            id: data.id,
            name: newListName,
            item_count: 0,
            description: "",
            public: false,
            favorite_count: 0,
            iso_639_1: "en",
            iso_3166_1: "US",
            poster_path: null,
            backdrop_path: null,
            average_rating: 0
          };
          if (!old) return { results: [newList], total_results: 1, total_pages: 1, page: 1 };
          return {
            ...old,
            results: [newList, ...old.results],
            total_results: (old.total_results || 0) + 1
          };
        });
      }

      setIsCreating(false);
      setNewListName("");
      
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["account_lists", account?.account_id] });
      }, 3000);

      if (data.id) {
        addMutation.mutate(data.id);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.status_message || "Failed to create list.",
        variant: "destructive",
      });
    }
  });

  const addMutation = useMutation({
    mutationFn: (listId: number) =>
      accountService.addItemsToList(account!.access_token, listId, [{ media_type: mediaType, media_id: mediaId }]),
    onMutate: async (listId) => {
      await queryClient.cancelQueries({ queryKey: ["list_item_status", listId, mediaType, mediaId] });
      const previousStatus = queryClient.getQueryData(["list_item_status", listId, mediaType, mediaId]);
      queryClient.setQueryData(["list_item_status", listId, mediaType, mediaId], { item_present: true, item_count: ((previousStatus as any)?.item_count || 0) + 1 });
      
      queryClient.setQueryData(["account_lists", account?.account_id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          results: old.results.map((l: any) => 
            l.id === listId ? { ...l, item_count: (l.item_count || 0) + 1 } : l
          )
        };
      });

      return { previousStatus };
    },
    onSuccess: (_, listId) => {
      const listName = listsData?.results.find((l: TMDBList) => l.id === listId)?.name || "list";
      toast({
        title: "Added to List",
        description: `Successfully added to "${listName}".`,
      });
    },
    onError: (error: any, listId, context) => {
      if (context?.previousStatus) {
        queryClient.setQueryData(["list_item_status", listId, mediaType, mediaId], context.previousStatus);
      }
      queryClient.setQueryData(["account_lists", account?.account_id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          results: old.results.map((l: any) => 
            l.id === listId ? { ...l, item_count: Math.max(0, (l.item_count || 1) - 1) } : l
          )
        };
      });

      toast({
        title: "Error",
        description: error.response?.data?.status_message || "Failed to add to list.",
        variant: "destructive",
      });
    },
    onSettled: (_, __, listId) => {
      queryClient.invalidateQueries({ queryKey: ["list_item_status", listId, mediaType, mediaId] });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["account_lists", account?.account_id] });
      }, 5000);
    }
  });

  const removeMutation = useMutation({
    mutationFn: (listId: number) =>
      accountService.removeItemsFromList(account!.access_token, listId, [{ media_type: mediaType, media_id: mediaId }]),
    onMutate: async (listId) => {
      await queryClient.cancelQueries({ queryKey: ["list_item_status", listId, mediaType, mediaId] });
      const previousStatus = queryClient.getQueryData(["list_item_status", listId, mediaType, mediaId]);
      queryClient.setQueryData(["list_item_status", listId, mediaType, mediaId], { item_present: false, item_count: Math.max(0, ((previousStatus as any)?.item_count || 1) - 1) });
      
      queryClient.setQueryData(["account_lists", account?.account_id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          results: old.results.map((l: any) => 
            l.id === listId ? { ...l, item_count: Math.max(0, (l.item_count || 1) - 1) } : l
          )
        };
      });

      return { previousStatus };
    },
    onSuccess: (_, listId) => {
      const listName = listsData?.results.find((l: TMDBList) => l.id === listId)?.name || "list";
      toast({
        title: "Removed from List",
        description: `Successfully removed from "${listName}".`,
      });
    },
    onError: (error: any, listId, context) => {
      if (context?.previousStatus) {
        queryClient.setQueryData(["list_item_status", listId, mediaType, mediaId], context.previousStatus);
      }
      queryClient.setQueryData(["account_lists", account?.account_id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          results: old.results.map((l: any) => 
            l.id === listId ? { ...l, item_count: (l.item_count || 0) + 1 } : l
          )
        };
      });

      toast({
        title: "Error",
        description: error.response?.data?.status_message || "Failed to remove from list.",
        variant: "destructive",
      });
    },
    onSettled: (_, __, listId) => {
      queryClient.invalidateQueries({ queryKey: ["list_item_status", listId, mediaType, mediaId] });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["account_lists", account?.account_id] });
      }, 5000);
    }
  });

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    createMutation.mutate();
  };

  if (!isLoggedIn) {
    return (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn("rounded-full w-10 h-10 border-border/50", className)}
            onClick={login}
          >
            <ListPlus className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Login to add to list</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        setIsCreating(false);
        setNewListName("");
      }
    }}>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full transition-all duration-300 w-10 h-10 border-border/50 relative",
                  isOpen && "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]",
                  isInAnyList && !isOpen && "border-primary text-primary bg-primary/5",
                  className
                )}
              >
                <AnimatePresence mode="wait">
                  {isInAnyList ? (
                    <motion.div
                      key="checked"
                      initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                    >
                      <ListChecks className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="plus"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <ListPlus className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {isInAnyList && !isOpen && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background animate-pulse" />
                )}
              </Button>
            </motion.div>
          </PopoverTrigger>
        </TooltipTrigger>
        {!isOpen && (
          <TooltipContent side="bottom">
            <p>{isInAnyList ? "Already in your lists" : "Add to personal list"}</p>
          </TooltipContent>
        )}
      </Tooltip>

      <PopoverContent 
        className="w-72 p-0 backdrop-blur-2xl bg-background/90 border-border/50 shadow-2xl rounded-2xl overflow-hidden" 
        align="center"
        sideOffset={10}
      >
        <AnimatePresence mode="wait">
          {!isCreating ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 border-b border-border/50 bg-muted/30">
                <h3 className="font-bold text-sm">Add to List</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 font-bold">Your Custom Collections</p>
              </div>

              <ScrollArea className="max-h-[300px]">
                <div className="p-2 flex flex-col gap-1">
                  {isListsLoading ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
                      <p className="text-xs text-muted-foreground font-medium">Fetching your lists...</p>
                    </div>
                  ) : listsData?.results?.length > 0 ? (
                    listsData.results.map((list: TMDBList) => (
                      <ListItem 
                        key={list.id}
                        list={list}
                        mediaType={mediaType}
                        mediaId={mediaId}
                        accessToken={account!.access_token}
                        onAdd={() => addMutation.mutate(list.id)}
                        onRemove={() => removeMutation.mutate(list.id)}
                        isMutating={(addMutation.variables === list.id && addMutation.isPending) || (removeMutation.variables === list.id && removeMutation.isPending)}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                      <p className="text-sm font-medium">No lists found</p>
                      <p className="text-xs text-muted-foreground mt-1">Create a list below to start organizing.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="p-3 border-t border-border/50 bg-muted/10">
                <Button 
                  variant="ghost" 
                  className="w-full text-[10px] h-8 font-black uppercase tracking-widest hover:bg-primary/5 hover:text-primary"
                  onClick={() => setIsCreating(true)}
                >
                  Create New List
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="create-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-4 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full" 
                  onClick={() => setIsCreating(false)}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <h3 className="font-bold text-sm">Create New List</h3>
              </div>

              <form onSubmit={handleCreateList} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="listName" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">
                    List Name
                  </label>
                  <Input
                    id="listName"
                    placeholder="e.g. Weekend Watchlist"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="h-10 rounded-xl bg-muted/50 border-border/50 focus:border-primary/50"
                    autoFocus
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-10 rounded-xl font-bold"
                  disabled={!newListName.trim() || createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Create & Add Item
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}

function ListItem({ 
  list, 
  mediaType, 
  mediaId, 
  accessToken,
  onAdd, 
  onRemove,
  isMutating 
}: { 
  list: TMDBList; 
  mediaType: "movie" | "tv"; 
  mediaId: number; 
  accessToken: string;
  onAdd: () => void; 
  onRemove: () => void;
  isMutating: boolean;
}) {
  const { data: status, isLoading } = useQuery({
    queryKey: ["list_item_status", list.id, mediaType, mediaId],
    queryFn: () => accountService.checkItemInList(accessToken, list.id, mediaType, mediaId),
    staleTime: 1000 * 60 * 5,
  });

  const isPresent = status?.item_present;

  return (
    <button
      onClick={() => isPresent ? onRemove() : onAdd()}
      disabled={isMutating}
      className={cn(
        "w-full flex items-center justify-between p-3 rounded-xl transition-all group text-left",
        isPresent ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-primary/5"
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className={cn(
          "text-sm font-semibold transition-colors",
          isPresent ? "text-primary" : "group-hover:text-primary"
        )}>
          {list.name}
        </span>
        <span className="text-[10px] text-muted-foreground min-h-[14px] flex items-center">
          {isLoading ? (
            <span className="w-8 h-2.5 bg-muted-foreground/20 animate-pulse rounded-full" />
          ) : (
            `${(status?.item_count ?? list.item_count ?? 0).toLocaleString()} items`
          )}
        </span>
      </div>
      <div className={cn(
        "w-6 h-6 rounded-full border flex items-center justify-center transition-all",
        isPresent ? "bg-primary border-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]" : "border-border/50 group-hover:border-primary/50"
      )}>
        {isMutating || isLoading ? (
          <Loader2 className={cn("w-3 h-3 animate-spin", isPresent ? "text-white" : "")} />
        ) : isPresent ? (
          <Check className="w-3 h-3 text-white" />
        ) : (
          <Plus className="w-3 h-3 group-hover:text-primary" />
        )}
      </div>
    </button>
  );
}
