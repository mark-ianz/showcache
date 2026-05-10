import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/api/account.service";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User, LogOut, Heart, List, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const { account, isLoggedIn, login, logout } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["account", account?.access_token],
    queryFn: () => accountService.getAccountDetails(account!.access_token),
    enabled: !!account?.access_token,
  });

  if (!isLoggedIn) {
    return (
      <Button variant="ghost" size="sm" onClick={login} className="gap-2">
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">Sign In</span>
      </Button>
    );
  }

  const avatarUrl = profile?.avatar.tmdb.avatar_path
    ? `https://image.tmdb.org/t/p/w150_and_h150_face${profile.avatar.tmdb.avatar_path}`
    : `https://www.gravatar.com/avatar/${profile?.avatar.gravatar.hash}?s=150`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 overflow-hidden border">
          {profile ? (
            <img src={avatarUrl} alt={profile.username} className="w-full h-full object-cover" />
          ) : (
            <User className="w-4 h-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium leading-none">{profile?.username || "Loading..."}</p>
          <p className="text-xs leading-none text-muted-foreground mt-1">
            TMDB Account
          </p>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col gap-1">
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="justify-start gap-2 h-9 w-full">
              <User className="w-4 h-4" />
              My Profile
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="justify-start gap-2 h-9">
            <Heart className="w-4 h-4" />
            Favorites
          </Button>
          <Button variant="ghost" size="sm" className="justify-start gap-2 h-9">
            <List className="w-4 h-4" />
            Watchlist
          </Button>
          <Button variant="ghost" size="sm" className="justify-start gap-2 h-9">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
        <Separator className="my-2" />
        <Button 
          variant="ghost" 
          size="sm" 
          className="justify-start gap-2 h-9 w-full text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}
