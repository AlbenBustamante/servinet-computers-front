import { IResponse } from './response.model';

export interface IPlatformReq {
  name: string;
}

export interface IPlatformRes extends IResponse {
  name: string;
}

export interface IPlatformBalanceReq {
  platformId: number;
  initialBalance: string;
  finalBalance: string;
}

export interface IPlatformBalanceRes extends IResponse {
  platformName: string;
  initialBalance: string;
  finalBalance: string;
}
