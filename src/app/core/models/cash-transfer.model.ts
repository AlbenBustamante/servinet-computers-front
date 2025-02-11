import { ICashRegisterDetailRes } from './cash-register.model';
import { ISafeDetailRes } from './safe.model';

export interface IAvailableTransfersDto {
  cashRegisters: ICashRegisterDetailRes[];
  safes: ISafeDetailRes[];
}
