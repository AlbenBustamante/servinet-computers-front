import { IBase } from './base.model';
import { IResponse } from './response.model';

export interface ISafeReq {
  numeral: number;
  initialBase?: IBase;
  finalBase?: IBase;
}

export interface ISafeRes extends IResponse {
  numeral: number;
  initialBase: number;
  finalBase: number;
  detailInitialBase: IBase;
  detailFinalBase: IBase;
}
