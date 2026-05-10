import fb_icon from "@/assets/fb_icon.png";
import ig_icon from "@/assets/ig_icon.webp";
import tiktok_icon from "@/assets/tiktok_icon.webp";
import twitter_icon from "@/assets/twitter_icon.png";
import youtube_icon from "@/assets/youtube_icon.png";
import { ValidExternalIds } from "@/types/credits";

export const nav_lists = [
  {
    name: "Home",
    path: "/",
    icon: "Home",
  },
  {
    name: "Trending",
    path: "/trending/movie",
    icon: "TrendingUp",
    submenu: [
      { name: "Movies", path: "/trending/movie" },
      { name: "TV", path: "/trending/tv" },
    ],
  },
  {
    name: "Movies",
    path: "/movie/popular",
    icon: "Film",
    submenu: [
      { name: "Popular", path: "/movie/popular" },
      { name: "Now Playing", path: "/movie/now-playing" },
      { name: "Upcoming", path: "/movie/upcoming" },
      { name: "Top Rated", path: "/movie/top-rated" },
    ],
  },
  {
    name: "TV Shows",
    path: "/tv/popular",
    icon: "Tv",
    submenu: [
      { name: "Airing Today", path: "/tv/airing-today" },
      { name: "Popular", path: "/tv/popular" },
      { name: "On TV", path: "/tv/on-the-air" },
      { name: "Top Rated", path: "/tv/top-rated" },
    ],
  },
  {
    name: "People",
    path: "/person",
    icon: "Users",
  },
];

export const external_ids_logo: ValidExternalIds = {
  facebook_id: fb_icon,
  instagram_id: ig_icon,
  tiktok_id: tiktok_icon,
  twitter_id: twitter_icon,
  youtube_id: youtube_icon,
};

export const external_ids_link: ValidExternalIds = {
  facebook_id: "https://www.facebook.com/",
  instagram_id: "https://www.instagram.com/",
  tiktok_id: "https://www.tiktok.com/@",
  twitter_id: "https://twitter.com/",
  youtube_id: "https://www.youtube.com/@",
};

export const search_categories = [
  { name: "People", value: "person" },
  { name: "Movies", value: "movie" },
  { name: "TV Shows", value: "tv" },
  {name: "Collections", value: "collection"}
];