import { IBase } from './base.model';
import { IResponse } from './response.model';

export interface ISafeReq {
  numeral: number;
}

export interface ISafeRes extends IResponse, ISafeReq {}

export interface ISafeBaseReq {
  base: IBase;
}

export interface ISafeBaseRes extends IResponse, ISafeBaseReq {
  safeId: number;
}
