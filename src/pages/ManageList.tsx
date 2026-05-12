import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "@/api/account.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Settings, ArrowLeft, Share2, Plus, List } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ShowCard from "@/components/show/ShowCard";

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
          <Button variant="secondary" size="sm" className="rounded-full gap-2" onClick={() => navigate("/")}>
            <Plus className="w-4 h-4" />
            Add More
          </Button>
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
    <Dialog>
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
          <Button variant="outline" className="rounded-xl" onClick={() => (document.querySelector('[data-state="open"]')?.parentElement?.querySelector('[type="button"]') as HTMLElement)?.click()}>Cancel</Button>
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
