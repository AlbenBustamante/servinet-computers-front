import { IResponse } from './response.model';

export interface IBalanceReq {
  name: string;
  campusId: number;
  initialBalance: string;
  finalBalance: string;
}

export interface IBalanceRes extends IResponse {
  platformName: string;
  campusId: number;
  initialBalance: string;
  finalBalance: string;
}
