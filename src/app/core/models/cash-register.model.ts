import { CashRegisterStatus } from './enums';
import { IResponse } from './response.model';

export interface ICashRegisterReq {
  numeral: number;
  description: string;
  status: CashRegisterStatus;
}

export interface ICashRegisterRes extends IResponse, ICashRegisterReq {}
