import { IResponse } from './response.model';

export interface ITransferReq {
  campusId: number;
  platformName: string;
  value: number;
  amount: string;
}

export interface ITransferRes extends IResponse {
  platformName: string;
  value: string;
  time: string;
}
