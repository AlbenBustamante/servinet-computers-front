import { IResponse } from './response.model';

export interface ISafeReq {
  numeral: number;
}

export interface ISafeRes extends IResponse {
  numeral: number;
}
