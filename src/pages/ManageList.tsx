import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { accountService } from "@/api/account.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Settings, ArrowLeft, Share2, Plus, List, Check, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ShowCard from "@/components/show/ShowCard";
import { useDebounce } from "@/hooks/useDebounce";
import { searchMulti } from "@/api/show.service";
import { useLanguage } from "@/context/language-provider";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

export default function ManageList() {
  const { id } = useParams<{ id: string }>();
  const { account, isLoggedIn, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const listId = parseInt(id || "0");

  const { data: list, isLoading: listLoading, error } = useQuery({
    queryKey: ["list_details", listId],
    queryFn: () => accountService.getListDetails(account!.access_token, listId),
    enabled: !!account?.access_token && listId > 0,
  });

  const removeMutation = useMutation({
    mutationFn: (item: { media_type: "movie" | "tv", media_id: number }) => 
      accountService.removeItemsFromList(account!.access_token, listId, [item]),
    onMutate: () => {
      toast({ title: "Removing...", description: "Updating your list." });
    },
    onSuccess: () => {
      toast({ title: "Removed", description: "Item removed from list." });
      queryClient.invalidateQueries({ queryKey: ["list_details", listId] });
    }
  });

  const addMutation = useMutation({
    mutationFn: (item: { media_type: "movie" | "tv", media_id: number }) => 
      accountService.addItemsToList(account!.access_token, listId, [item]),
    onMutate: () => {
      toast({ title: "Adding...", description: "Adding title to your list." });
    },
    onSuccess: () => {
      toast({ title: "Added", description: "Item added to list." });
      queryClient.invalidateQueries({ queryKey: ["list_details", listId] });
    }
  });

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({ 
      title: "Link Copied", 
      description: "List URL copied to clipboard.",
    });
  };

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, authLoading, navigate]);

  if (authLoading || listLoading) {
    return (
      <div className="container mx-auto py-10 px-4 space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !list) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">List not found</h2>
        <Button variant="link" onClick={() => navigate("/profile")}>Back to Profile</Button>
      </div>
    );
  }

  const items = list.results || [];

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-3xl">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 -ml-2 text-muted-foreground hover:text-primary"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight">{list.name}</h1>
              {!list.public && (
                <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-bold uppercase tracking-widest border">Private</span>
              )}
            </div>
            {list.description && (
              <p className="text-muted-foreground mt-2 text-lg leading-relaxed">{list.description}</p>
            )}
            <p className="text-sm text-primary/60 font-medium mt-1">
              {list.item_count} items • Created by {list.created_by?.name || "you"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 rounded-xl">
                <Settings className="w-4 h-4" />
                List Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit List Settings</DialogTitle>
                <DialogDescription>Modify your list's name, description and visibility.</DialogDescription>
              </DialogHeader>
              <EditListForm 
                list={list} 
                listId={listId} 
                accessToken={account!.access_token} 
                onSuccess={() => setIsEditDialogOpen(false)} 
              />
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="icon" className="rounded-xl" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
          </Button>
          
          <DeleteListButton listId={listId} listName={list.name} />
        </div>
      </div>

      <hr className="border-border/50" />

      {/* Items Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Titles ({list.item_count})</h2>
          <AddMoreSearchModal 
          onAdd={(item) => addMutation.mutate(item)} 
          onRemove={(item) => removeMutation.mutate(item)}
          existingItems={items}
        />
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed rounded-3xl bg-muted/20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <List className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-xl font-medium">Your list is empty</p>
            <p className="text-muted-foreground mt-1 max-w-xs mx-auto">
              Start adding movies and TV shows to this collection from their detail pages.
            </p>
            <Button className="mt-6 rounded-xl" onClick={() => navigate("/")}>Explore Content</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {items.map((item: any) => {
              const itemRemovalMutation = removeMutation;
              return (
                <ShowCard
                  key={`${item.media_type}-${item.id}`}
                  id={item.id}
                  mediaType={item.media_type}
                  name={item.title || item.name}
                  image_path={item.poster_path}
                  vote_average={item.vote_average}
                  genre_ids={item.genre_ids}
                  release_date={item.release_date || item.first_air_date}
                  path={`/${item.media_type}/${item.id}`}
                  onRemove={() => itemRemovalMutation.mutate({ media_type: item.media_type, media_id: item.id })}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function EditListForm({ list, listId, accessToken, onSuccess }: { 
  list: any, 
  listId: number, 
  accessToken: string,
  onSuccess: () => void 
}) {
  const [formData, setFormData] = useState({
    name: list.name || "",
    description: list.description || "",
    public: list.public ? "true" : "false",
    sort_by: list.sort_by || "original_order.asc"
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => accountService.updateList(accessToken, listId, {
      name: formData.name,
      description: formData.description,
      public: formData.public === "true",
      sort_by: formData.sort_by
    }),
    onSuccess: () => {
      toast({ title: "List Updated", description: "Your changes have been saved." });
      queryClient.invalidateQueries({ queryKey: ["list_details", listId] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      onSuccess();
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.status_message || "Failed to update list.",
        variant: "destructive"
      });
    }
  });

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Name</label>
        <Input 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          className="h-12 bg-muted/50 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Description</label>
        <Textarea 
          value={formData.description} 
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          className="min-h-[120px] bg-muted/50 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Public List?</label>
          <Select 
            value={formData.public} 
            onValueChange={(v) => setFormData({ ...formData, public: v })}
          >
            <SelectTrigger className="h-12 bg-muted/50 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes, make it public</SelectItem>
              <SelectItem value="false">No, keep it private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort By</label>
          <Select 
            value={formData.sort_by} 
            onValueChange={(v) => setFormData({ ...formData, sort_by: v })}
          >
            <SelectTrigger className="h-12 bg-muted/50 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="original_order.asc">Original Ascending</SelectItem>
              <SelectItem value="original_order.desc">Original Descending</SelectItem>
              <SelectItem value="vote_average.asc">Rating Ascending</SelectItem>
              <SelectItem value="vote_average.desc">Rating Descending</SelectItem>
              <SelectItem value="release_date.asc">Date Ascending</SelectItem>
              <SelectItem value="release_date.desc">Date Descending</SelectItem>
              <SelectItem value="title.asc">Title (A-Z)</SelectItem>
              <SelectItem value="title.desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter className="pt-4 gap-2">
        <Button variant="ghost" className="rounded-xl" onClick={onSuccess}>Cancel</Button>
        <Button 
          onClick={() => mutation.mutate()} 
          disabled={mutation.isPending}
          className="min-w-[120px] font-bold rounded-xl"
        >
          {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Save Changes
        </Button>
      </DialogFooter>
    </div>
  );
}


function DeleteListButton({ listId, listName }: { listId: number, listName: string }) {
  const { account } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => accountService.deleteList(account!.access_token, listId),
    onMutate: () => {
      toast({ title: "Deleting...", description: `Removing "${listName}" permanently.` });
    },
    onSuccess: () => {
      toast({ title: "List Deleted", description: `"${listName}" has been deleted.` });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      navigate("/profile");
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 rounded-xl">
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this list?</DialogTitle>
          <DialogDescription>
            This will permanently delete <strong>{listName}</strong> and all its contents. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" className="rounded-xl" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button 
            variant="destructive"
            onClick={() => deleteMutation.mutate()} 
            disabled={deleteMutation.isPending}
            className="rounded-xl font-bold"
          >
            {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Yes, Delete List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddMoreSearchModal({ 
  onAdd, 
  onRemove,
  existingItems 
}: { 
  onAdd: (item: { media_type: "movie" | "tv", media_id: number }) => void,
  onRemove: (item: { media_type: "movie" | "tv", media_id: number }) => void,
  existingItems: any[]
}) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { language: { iso_639_1: languageCode } } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const { 
    data: searchResults, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ["search_multi_infinite", languageCode, debouncedQuery],
    queryFn: ({ pageParam = 1 }) => 
      searchMulti({ queryKey: ["search_multi", languageCode, debouncedQuery, pageParam] } as any),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      const maxPages = Math.min(lastPage.total_pages, 500);
      return nextPage <= maxPages ? nextPage : undefined;
    },
    enabled: debouncedQuery.length > 2,
  });

  const { targetRef, isIntersecting } = useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
    threshold: 0.1,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const filteredResults = searchResults?.pages.flatMap(page => 
    page.results.filter((item: any) => item.media_type === "movie" || item.media_type === "tv")
  ) || [];

  const existingItemsMap = new Map(existingItems.map(item => [`${item.media_type}:${item.id}`, true]));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="rounded-full gap-2">
          <Plus className="w-4 h-4" />
          Add More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0 overflow-hidden rounded-3xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">Add to List</DialogTitle>
          <DialogDescription>Search for movies or TV shows to add to this list.</DialogDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search titles..." 
              className="pl-10 rounded-xl bg-muted/50 border-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </DialogHeader>

        <ScrollArea className="h-[450px] w-full">
          <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-2xl" />
              ))}
            </div>
          ) : debouncedQuery.length > 0 && debouncedQuery.length <= 2 ? (
            <div className="text-center py-10 text-muted-foreground">
              Type at least 3 characters to search...
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid gap-2 w-full">
              {filteredResults.map((item: any) => {
                const isInList = existingItemsMap.has(`${item.media_type}:${item.id}`);
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (isInList) {
                        onRemove({ media_type: item.media_type, media_id: item.id });
                      } else {
                        onAdd({ media_type: item.media_type, media_id: item.id });
                      }
                    }}
                    className={cn(
                      "flex items-center gap-4 p-2 w-full rounded-2xl transition-all text-left group overflow-hidden border border-transparent",
                      isInList ? "bg-primary/5 hover:bg-primary/10 border-primary/10" : "hover:bg-accent/50"
                    )}
                  >
                    <div className="w-12 h-18 bg-muted rounded-xl overflow-hidden shrink-0 aspect-[2/3] shadow-sm">
                      {item.poster_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} 
                          alt={item.title || item.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-accent">
                          <Plus className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold truncate text-lg leading-tight">{item.title || item.name}</h4>
                        {isInList && (
                          <span className="flex items-center gap-1 text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full uppercase tracking-tighter shrink-0">
                            <Check className="w-2.5 h-2.5" />
                            In List
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-70 truncate">
                        {item.media_type} • {item.release_date || item.first_air_date ? new Date(item.release_date || item.first_air_date).getFullYear() : "N/A"}
                      </p>
                    </div>
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0",
                      isInList 
                        ? "bg-primary text-primary-foreground opacity-100 group-hover:bg-destructive group-hover:text-destructive-foreground" 
                        : "bg-primary/10 text-primary opacity-0 group-hover:opacity-100"
                    )}>
                      {isInList ? (
                        <>
                          <Check className="w-5 h-5 group-hover:hidden" />
                          <X className="w-5 h-5 hidden group-hover:block" />
                        </>
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                );
              })}
              
              {/* Infinite Scroll Trigger */}
              <div ref={targetRef} className="h-10 flex items-center justify-center w-full">
                {isFetchingNextPage && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
              </div>
            </div>
          ) : debouncedQuery.length > 2 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>No movies or TV shows found for "{debouncedQuery}"</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center">
              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                <Search className="w-10 h-10 opacity-20" />
              </div>
              <p className="text-lg font-medium text-foreground">What are we looking for?</p>
              <p className="text-sm">Search for titles to expand your collection.</p>
            </div>
          )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
