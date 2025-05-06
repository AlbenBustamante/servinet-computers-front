import { ICashRegisterDetailRes } from './cash-register.model';
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

export interface IBankDepositDto extends IResponse<number> {
  collector: string;
  status: BankDepositStatus;
  openedBy: string;
  expense: IExpenseRes;
  depositors: IDepositor[];
  payments: IBankDepositPaymentDto;
}

export interface IBankDepositPaymentDto extends IResponse<number> {
  bankDepositId: number;
  value: number;
  platform: IPlatformRes;
}
