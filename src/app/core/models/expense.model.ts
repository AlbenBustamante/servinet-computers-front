import { IResponse } from './response.model';

export interface IExpenseReq {
  cashRegisterDetailId: number;
  description: string;
  value: number;
  discount: boolean;
  administrative: boolean;
}

export interface IExpenseRes extends IResponse<number>, IExpenseReq {}

export interface IUpdateExpenseDto {
  description: string;
  value: number;
  discount: boolean;
  tempCode: number;
}
