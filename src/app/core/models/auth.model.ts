import { AuthToken } from './enums';

export interface IAuthRequest {
  code: string;
  password: string;
}

export interface IAuthResponse {
  jwt: string;
}

export interface IJwtResponse {
  sub: string;
  iss: string;
  id: number;
  type: AuthToken;
  iat: Date;
  exp: Date;
}
