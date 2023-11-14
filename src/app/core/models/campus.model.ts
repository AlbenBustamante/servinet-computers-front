import { IPlatformRes } from './platform.model';
import { IResponse } from './response.model';

export interface ICampusReq {
  userId: number;
  numeral: number;
  address: string;
  cellphone: string;
  password: string;
  repeatPassword: string;
  terminal: string;
}

export interface ICampusRes extends IResponse {
  numeral: number;
  address: string;
  cellphone: string;
  terminal: string;
  platforms: IPlatformRes[];
}
