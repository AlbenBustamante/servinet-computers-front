import { IResponse } from './response.model';

export interface IExpenseReq {
  cashRegisterDetailId: number;
  description: string;
  value: number;
  discount: boolean;
}

export interface IExpenseRes extends IResponse, IExpenseReq {}
