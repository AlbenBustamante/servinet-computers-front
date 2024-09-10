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
  initialBase: IBase;
  finalBase?: IBase;
  baseObservation: string;
}

export interface ICashRegisterDetailRes extends IResponse {
  cashRegisterId: number;
  initialWorking: string;
  initialBreak: string;
  finalBreak: string;
  finalWorking: string;
  initialBase: IBase;
  finalBase?: IBase;
  baseObservation: string;
}
