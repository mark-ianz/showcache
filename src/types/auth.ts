export interface RequestTokenResponse {
  status_message: string;
  request_token: string;
  success: boolean;
  status_code: number;
}

export interface AccessTokenResponse {
  status_message: string;
  access_token: string;
  success: boolean;
  status_code: number;
  account_id: string;
}

export interface UserAccount {
  account_id: string;
  access_token: string;
}
