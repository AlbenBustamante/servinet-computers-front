import { Role } from './enums';
import { IExpenseRes } from './expense.model';
import { IPlatformTransferRes } from './platform.model';
import { IResponse } from './response.model';
import { ITransactionDetailRes } from './transaction.model';

export interface IUserReq {
  name: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  role: Role;
}

export interface IUserRes extends IResponse {
  name: string;
  lastName: string;
  code: string;
  role: Role;
}

export interface IReportsRes {
  platformTransfers: IPlatformTransferRes[];
  expenses: IExpenseRes[];
  discounts: IExpenseRes[];
  transactions: ITransactionDetailRes[];
}
