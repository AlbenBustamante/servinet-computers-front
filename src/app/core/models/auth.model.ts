import { Role } from './enums';

export interface IRequestPasswordTempCodeDto {
  userCode: string;
}

export interface IChangePasswordDto {
  userCode: string;
  tempCode: string;
  newPassword: string;
  confirmPassword: string;
}

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
  role: Role;
  iat: Date;
  exp: Date;
}
