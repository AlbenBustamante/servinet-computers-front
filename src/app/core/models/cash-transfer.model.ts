import { IBase } from './base.model';
import { ICashRegisterDetailRes } from './cash-register.model';
import { CashBoxType } from './enums';
import { IResponse } from './response.model';
import { ISafeDetailRes } from './safe.model';

export interface ICreateCashTransferDto {
  value: number;
  senderId: number;
  receiverId: number;
  senderType: CashBoxType;
  receiverType: CashBoxType;
  safeDetailId?: number;
  safeBase?: IBase;
  currentCashRegisterDetailId: number;
}

export interface ICashTransferDto extends IResponse {
  value: number;
  receiverId: number;
  senderId: number;
  received: boolean;
  receiver: string;
  sender: string;
  receiverType: CashBoxType;
  senderType: CashBoxType;
  safeBase: IBase;
}

export interface IAvailableTransfersDto {
  cashRegisters: ICashRegisterDetailRes[];
  safes: ISafeDetailRes[];
}
