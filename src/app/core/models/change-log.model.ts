import {
  CashRegisterDetailStatus,
  ChangeLogAction,
  ChangeLogType,
} from './enums';
import { IResponse } from './response.model';

export interface IChangeLogRes extends IResponse {
  previousData: string;
  newData: string;
  action: ChangeLogAction;
  type: ChangeLogType;
  currentStatus: CashRegisterDetailStatus;
  cashRegisterDetailId: number;
}
