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
  date?: string;
}

export interface IUpdatePlatformTransferDto {
  value: number;
  platformId?: number;
  date?: string;
}

export interface IPlatformTransferRes extends IResponse<number> {
  value: number;
  voucherUrls?: string[];
  platform: IPlatformRes;
}

export interface IPortalPlatform {
  platformId: number;
  platformName: string;
  balanceId: number;
  initialBalance: number;
  finalBalance: number;
  transfersAmount: number;
  transfersTotal: number;
}

export interface IPlatformStatsDto extends IPortalPlatform {
  bankDepositsAmount: number;
  bankDepositsTotal: number;
  total: number;
}

export interface IAdminPlatformDto {
  platform: IPlatformStatsDto;
  transfers: IPlatformTransferRes[];
}
