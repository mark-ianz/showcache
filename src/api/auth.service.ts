import axios from "axios";
import { axios_config } from "./axios.config";
import { AccessTokenResponse, RequestTokenResponse } from "@/types/auth";

const BASE_URL = "https://api.themoviedb.org/4";

export const authService = {
  async createRequestToken(redirectTo: string): Promise<RequestTokenResponse> {
    const { data } = await axios.post<RequestTokenResponse>(
      `${BASE_URL}/auth/request_token`,
      { redirect_to: redirectTo },
      axios_config({ method: "POST" })
    );
    return data;
  },

  async createAccessToken(requestToken: string): Promise<AccessTokenResponse> {
    const { data } = await axios.post<AccessTokenResponse>(
      `${BASE_URL}/auth/access_token`,
      { request_token: requestToken },
      axios_config({ method: "POST" })
    );
    return data;
  },

  async logout(accessToken: string): Promise<void> {
    await axios.delete(
      `${BASE_URL}/auth/access_token`,
      {
        ...axios_config({ method: "DELETE" }),
        data: { access_token: accessToken }
      }
    );
  }
};
