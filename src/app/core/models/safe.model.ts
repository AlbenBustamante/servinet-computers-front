import { IBase } from './base.model';
import { IResponse } from './response.model';

export interface ISafeReq {
  numeral: number;
}

export interface ISafeRes extends IResponse<number> {
  numeral: number;
}

export interface ISafeDetailRes extends IResponse<number> {
  detailInitialBase: IBase;
  detailFinalBase: IBase;
  safeId: number;
  initialBase: number;
  finalBase: number;
  calculatedBase: number;
  safe: ISafeRes;
  bases: ISafeBaseRes[];
}

export interface ISafeBaseReq {
  safeDetailId: number;
  base: IBase;
}

export interface ISafeBaseRes extends IResponse<number> {
  safeDetailId: number;
  base: number;
  detailBase: IBase;
}

export interface CreateAdminTransferCommand {
  amount: number;
  denomination: number;
  add: boolean;
}
