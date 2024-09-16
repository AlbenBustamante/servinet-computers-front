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
  userId?: number;
  workingHours: string;
  initialBase: IBase;
  finalBase?: IBase;
  baseObservation: string;
}

export interface ICashRegisterDetailRes extends IResponse {
  cashRegisterId: number;
  cashRegisterNumeral: number;
  cashRegisterDescription: number;
  userId: number;
  initialWorking: string;
  initialBreak: string;
  finalBreak: string;
  finalWorking: string;
  initialBase: IBase;
  finalBase?: IBase;
  baseObservation: string;
}

export interface ICashRegisterDetailReportsDto {
  cashRegisterDetail: ICashRegisterDetailRes;
  transactionsAmount: number;
  initialBase: number;
  finalBase: number;
  deposits: number;
  withdrawals: number;
  expenses: number;
  credits: number;
  balance: number;
  discrepancy: number;
}

export interface IMyCashRegistersReports {
  cashRegisterDetailsReports: ICashRegisterDetailReportsDto[];
  finalReport: ICashRegisterDetailReportsDto;
}

export interface IAlreadyExistsCashRegisterDetailDto {
  alreadyExists: boolean;
  myCashRegisters: IMyCashRegistersReports;
  availableCashRegisters: ICashRegisterRes[];
}
