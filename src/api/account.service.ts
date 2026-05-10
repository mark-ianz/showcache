import axios from "axios";
import { axios_config } from "./axios.config";

export interface TMDBAccount {
  id: number;
  name: string;
  username: string;
  avatar: {
    gravatar: { hash: string };
    tmdb: { avatar_path: string | null };
  };
}

export const accountService = {
  async getAccountDetails(accessToken: string): Promise<TMDBAccount> {
    const { data } = await axios.get<TMDBAccount>(
      `https://api.themoviedb.org/3/account`,
      axios_config({ 
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async markAsFavorite(
    accessToken: string,
    mediaType: "movie" | "tv",
    mediaId: number,
    favorite: boolean
  ): Promise<void> {
    await axios.post(
      `https://api.themoviedb.org/3/account/favorite`,
      { media_type: mediaType, media_id: mediaId, favorite },
      axios_config({ 
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
  },

  async addToWatchlist(
    accessToken: string,
    mediaType: "movie" | "tv",
    mediaId: number,
    watchlist: boolean
  ): Promise<void> {
    await axios.post(
      `https://api.themoviedb.org/3/account/watchlist`,
      { media_type: mediaType, media_id: mediaId, watchlist },
      axios_config({ 
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
  },

  async getAccountStates(
    accessToken: string,
    mediaType: "movie" | "tv",
    mediaId: number
  ): Promise<{ favorite: boolean; watchlist: boolean }> {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/account_states`,
      axios_config({ 
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  }
};
