import { IBase } from './base.model';
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

export interface ICashRegisterDetailRes extends IResponse {
  cashRegisterId: number;
  initialWorking: string;
  initialBreak: string;
  finalBreak: string;
  finalWorking: string;
}

export interface ICashRegisterBaseReq {
  cashRegisterDetailId: number;
  initialBase: IBase;
  finalBase: IBase;
  observation?: string;
}

export interface ICashRegisterBaseRes extends IResponse, ICashRegisterBaseReq {}
