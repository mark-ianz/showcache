type AxiosConfig = {
  method: "GET" | "POST" | "DELETE" | "UPDATE";
  headers?: {};
  params?: {};
  data?: {};
};

export const axios_config = ({
  method,
  headers,
  params,
  data,
}: AxiosConfig) => {
  return {
    method,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH,
      ...headers,
    },
    params: {
      ...params,
    },
    data,
  };
};