import { IResponse } from './response.model';

export interface IBalanceRes extends IResponse {
  platformName: string;
  campusId: number;
  initialBalance: string;
  finalBalance: string;
}
