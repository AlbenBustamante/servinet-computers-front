import { BankDepositStatus } from './enums';
import { IExpenseRes } from './expense.model';
import { IPlatformRes } from './platform.model';
import { IResponse } from './response.model';

export interface ICreateBankDepositDto {
  collector: string;
  expenseNote?: string | null;
  expenseValue?: number | null;
  cashRegisterDetailId: number;
}

interface IDepositor {
  id: number;
  fullName: string;
  value: number;
  date: Date;
}

export interface ICreateDepositorDto {
  pk: {
    bankDepositId: number;
    cashRegisterDetailId: number;
  };
  value: number;
}

export interface IBankDepositDto extends IResponse<number> {
  collector: string;
  status: BankDepositStatus;
  openedBy: string;
  totalCollected: number;
  expense: IExpenseRes;
  depositors: IDepositor[];
  payments: IBankDepositPaymentDto[];
}

export interface ICreateBankDepositPaymentDto {
  bankDepositId: number;
  platformId: number;
  value: number;
}

export interface IBankDepositPaymentDto extends IResponse<number> {
  bankDepositId: number;
  value: number;
  platform: IPlatformRes;
}
