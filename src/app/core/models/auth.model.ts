export interface IAuthRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  jwt: string;
}
