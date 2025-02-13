import { ICashRegisterDetailRes } from './cash-register.model';
import { CashBoxType } from './enums';
import { IResponse } from './response.model';
import { ISafeDetailRes } from './safe.model';

export interface ICashTransferDto extends IResponse {
  value: number;
  receiverId: number;
  senderId: number;
  received: boolean;
  receiver: string;
  sender: string;
  receiverType: CashBoxType;
  senderType: CashBoxType;
}

export interface IAvailableTransfersDto {
  cashRegisters: ICashRegisterDetailRes[];
  safes: ISafeDetailRes[];
}
