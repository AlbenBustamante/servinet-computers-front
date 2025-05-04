import { IResponse } from './response.model';

export interface IPlatformReq {
  name: string;
}

export interface IPlatformRes extends IResponse<number> {
  name: string;
}

export interface IUpdatePlatformDto {
  name: string;
}

export interface IPlatformBalanceRes extends IResponse<number> {
  initialBalance: number;
  finalBalance: number;
  platform: IPlatformRes;
}

export interface IUpdatePlatformBalanceDto {
  initialBalance: number;
  finalBalance: number;
}

export interface IPlatformTransferReq {
  platformId: number;
  value: number;
}

export interface IPlatformTransferRes extends IResponse<number> {
  value: number;
  voucherUrls?: string[];
  platform: IPlatformRes;
}

export interface IPortalPlatform {
  platformId: number;
  platformName: string;
  platformBalanceId: number;
  initialBalance: number;
  finalBalance: number;
  transfersAmount: number;
  transfersTotal: number;
}

export interface IPlatformStatsDto extends IPortalPlatform {
  total: number;
}
