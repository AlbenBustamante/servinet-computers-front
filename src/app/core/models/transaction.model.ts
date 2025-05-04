import { TransactionDetailType, TransactionType } from './enums';
import { IResponse } from './response.model';

export interface ITransactionReq {
  description: string;
  type?: TransactionType;
}

export interface ITransactionRes extends IResponse<number>, ITransactionReq {}

export interface ITransactionDetailReq {
  cashRegisterDetailId: number;
  transactionId?: number;
  transaction?: string;
  type: TransactionDetailType;
  value: number;
  commission: number;
  date?: Date;
}

export interface ITransactionDetailRes extends IResponse<number> {
  cashRegisterDetailId: number;
  description: string;
  value: number;
  commission: number;
  type: TransactionDetailType;
  date: Date;
}

export interface IUpdateTransactionDetailDto {
  description: string;
  value: number;
  commission: number;
  type: TransactionDetailType;
  date: Date;
  tempCode: number;
}
