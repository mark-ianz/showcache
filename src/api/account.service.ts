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

  async addRating(
    accessToken: string,
    mediaType: "movie" | "tv",
    mediaId: number,
    value: number
  ): Promise<any> {
    const { data } = await axios.post(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/rating`,
      { value },
      axios_config({ 
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async deleteRating(
    accessToken: string,
    mediaType: "movie" | "tv",
    mediaId: number
  ): Promise<any> {
    const { data } = await axios.delete(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/rating`,
      axios_config({ 
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async markAsFavorite(
    accessToken: string,
    accountId: string,
    mediaType: "movie" | "tv",
    mediaId: number,
    favorite: boolean
  ): Promise<any> {
    const { data } = await axios.post(
      `https://api.themoviedb.org/3/account/${accountId}/favorite`,
      {
        media_type: mediaType,
        media_id: mediaId,
        favorite: favorite,
      },
      axios_config({ 
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async addToWatchlist(
    accessToken: string,
    accountId: string,
    mediaType: "movie" | "tv",
    mediaId: number,
    watchlist: boolean
  ): Promise<any> {
    const { data } = await axios.post(
      `https://api.themoviedb.org/3/account/${accountId}/watchlist`,
      {
        media_type: mediaType,
        media_id: mediaId,
        watchlist: watchlist,
      },
      axios_config({ 
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async getAccountStates(
    accessToken: string,
    mediaType: "movie" | "tv",
    mediaId: number
  ): Promise<any> {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/account_states`,
      axios_config({ 
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async getV4PersonalizedList(
    accessToken: string,
    accountId: string,
    type: "favorite" | "watchlist" | "rated",
    mediaType: "movies" | "tv",
    page: number = 1
  ): Promise<any> {
    // V4 Pattern: /4/account/{id}/{media_type}/{action}
    // Note: mediaType must be 'movie' or 'tv' (singular) for V4, and action for favorites is 'favorites' (plural)
    const normalizedMediaType = mediaType === "movies" ? "movie" : "tv";
    let action = type as string;
    if (type === "favorite") action = "favorites";

    const { data } = await axios.get(
      `https://api.themoviedb.org/4/account/${accountId}/${normalizedMediaType}/${action}?page=${page}`,
      axios_config({ 
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async getAccountLists(
    accessToken: string,
    accountId: string,
    page: number = 1
  ): Promise<any> {
    const { data } = await axios.get(
      `https://api.themoviedb.org/4/account/${accountId}/lists?page=${page}`,
      axios_config({ 
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async createList(
    accessToken: string,
    name: string,
    description: string = "",
    isPublic: boolean = false
  ): Promise<any> {
    const { data } = await axios.post(
      `https://api.themoviedb.org/4/list`,
      {
        name,
        description,
        public: isPublic,
        iso_639_1: "en", // Default to English for now, can be improved
      },
      axios_config({ 
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async addItemsToList(
    accessToken: string,
    listId: number,
    items: Array<{ media_type: "movie" | "tv", media_id: number }>
  ): Promise<any> {
    const { data } = await axios.post(
      `https://api.themoviedb.org/4/list/${listId}/items`,
      { items },
      axios_config({ 
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async removeItemsFromList(
    accessToken: string,
    listId: number,
    items: Array<{ media_type: "movie" | "tv", media_id: number }>
  ): Promise<any> {
    const { data } = await axios.delete(
      `https://api.themoviedb.org/4/list/${listId}/items`,
      axios_config({ 
        method: "DELETE",
        data: { items },
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    );
    return data;
  },

  async checkItemInList(
    accessToken: string,
    listId: number,
    mediaType: "movie" | "tv",
    mediaId: number
  ): Promise<{ item_present: boolean; item_count: number }> {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/4/list/${listId}`,
        axios_config({ 
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` }
        })
      );
      
      // Check if the item is in the first page of results
      const isPresent = data.results?.some((item: any) => {
        if (typeof item === 'string') {
          return item === `${mediaType}:${mediaId}`;
        }
        return item.id === mediaId || item.media_id === mediaId;
      });

      return { 
        item_present: !!isPresent,
        item_count: data.item_count || 0
      };
    } catch (error: any) {
      if (error.response?.status === 404 || error.response?.data?.status_code === 34) {
        return { item_present: false, item_count: 0 };
      }
      throw error;
    }
  }
};
