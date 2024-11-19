import { IBase } from './base.model';
import { IResponse } from './response.model';

export interface ISafeReq {
  numeral: number;
}

export interface ISafeRes extends IResponse {
  numeral: number;
}

export interface ISafeDetailRes extends IResponse {
  detailInitialBase: IBase;
  detailFinalBase: IBase;
  safeId: number;
  initialBase: number;
  finalBase: number;
  calculatedBase: number;
}
