import { IResponse } from './response.model';

export interface IPlatformReq {
  name: string;
}

export interface IPlatformRes extends IResponse {
  name: string;
}

export interface IPlatformBalanceReq {
  platformId: number;
  initialBalance: number;
  finalBalance: number;
}

export interface IPlatformBalanceRes extends IResponse, IPlatformBalanceReq {
  platformName: string;
}

export interface IPlatformTransferReq {
  platformId: number;
  value: number;
}

export interface IPlatformTransferRes extends IResponse, IPlatformBalanceReq {}
