import { CashRegisterStatus } from './enums';
import { IResponse } from './response.model';

export interface ICashRegisterReq {
  numeral: number;
  description: string;
  status: CashRegisterStatus;
}

export interface ICashRegisterRes extends IResponse, ICashRegisterReq {}

export interface ICashRegisterDetailReq {
  cashRegisterId: number;
  workingHours: string;
}

export interface ICashRegisterDetailRes {
  cashRegisterId: number;
  initialWorking: string;
  initialBreak: string;
  finalBreak: string;
  finalWorking: string;
}
