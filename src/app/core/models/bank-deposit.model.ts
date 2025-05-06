import { ICashRegisterDetailRes } from './cash-register.model';
import { BankDepositStatus } from './enums';
import { IExpenseRes } from './expense.model';
import { IResponse } from './response.model';

export interface ICreateBankDepositDto {
  collector: string;
  expenseNote?: string | null;
  expenseValue?: number | null;
  cashRegisterDetailId: number;
}

export interface IBankDepositDto extends IResponse<number> {
  collector: string;
  status: BankDepositStatus;
  expense: IExpenseRes;
  cashRegisterDetail: ICashRegisterDetailRes;
}
