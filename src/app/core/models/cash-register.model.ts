import { IBase } from './base.model';
import { ICashTransferDto } from './cash-transfer.model';
import { IChangeLogRes } from './change-log.model';
import { CashRegisterDetailStatus, CashRegisterStatus } from './enums';
import { IExpenseRes } from './expense.model';
import { IResponse } from './response.model';
import { ITransactionDetailRes } from './transaction.model';
import { IUserRes } from './user.model';

export interface ICashRegisterReq {
  numeral: number;
  description: string;
  status: CashRegisterStatus;
}

export interface ICashRegisterRes extends IResponse, ICashRegisterReq {}

export interface IUpdateCashRegisterDto {
  description: string;
  disabled: boolean;
}

export interface ICashRegisterDetailReq {
  cashRegisterId: number;
  userId?: number;
  initialWorking: string;
  initialBase: IBase;
  finalBase?: IBase;
  baseObservation: string;
}

export interface ICashRegisterDetailRes extends IResponse {
  userId: number;
  initialWorking: Date;
  initialBreak: Date;
  finalBreak: Date;
  finalWorking: Date;
  detailInitialBase: IBase;
  detailFinalBase: IBase;
  initialBase: number;
  finalBase?: number;
  baseObservation: string;
  status: CashRegisterDetailStatus;
  cashRegister: ICashRegisterRes;
  user: IUserRes;
}

export interface ICashRegisterDetailReportsDto {
  cashRegisterDetail: ICashRegisterDetailRes;
  transactionsAmount: number;
  initialBase: number;
  finalBase: number;
  deposits: number;
  withdrawals: number;
  expenses: number;
  discounts: number;
  earnings: number;
  balance: number;
  discrepancy: number;
}

interface IDetailedCashRegisterTransactionsDto {
  transactions: ITransactionDetailRes[];
  expenses: IExpenseRes[];
  discounts: IExpenseRes[];
  transfers: ICashTransferDto[];
}

export interface IDetailedCashRegisterReportsDto {
  reports: ICashRegisterDetailReportsDto;
  transactions: IDetailedCashRegisterTransactionsDto;
  changeLogs: IChangeLogRes[];
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

export interface IAdmCashRegistersDto {
  currentCashRegisters: ICashRegisterDetailRes[];
  pendingCashRegisters: ICashRegisterDetailRes[];
  remainingCashRegisters: ICashRegisterDetailRes[];
}

export interface IUpdateCashRegisterDetailBaseDto {
  base: IBase;
  initial: boolean;
}

export interface ICloseCashRegisterDetailDto {
  time?: Date;
  base: IBase;
}
