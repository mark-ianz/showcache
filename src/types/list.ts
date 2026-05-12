export interface TMDBList {
  id: number;
  name: string;
  description: string;
  item_count: number;
  public: boolean;
  favorite_count: number;
  iso_639_1: string;
  iso_3166_1: string;
  poster_path: string | null;
  backdrop_path: string | null;
  average_rating: number;
}

export interface ListsResponse {
  page: number;
  results: TMDBList[];
  total_pages: number;
  total_results: number;
}

export interface ListStatusResponse {
  id: number | null;
  item_present: boolean;
  status_code: number;
  status_message: string;
  success: boolean;
}
