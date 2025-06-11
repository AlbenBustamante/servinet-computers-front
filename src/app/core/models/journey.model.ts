import { ICashRegisterDetailRes } from './cash-register.model';
import { IExpenseRes } from './expense.model';

export interface IJourneyDto {
  cashRegisterDetail: ICashRegisterDetailRes;
  discounts: IExpenseRes;
  totalOfDiscounts: number;
  totalOfTransactions: number;
  totalOfHours: string;
}

export interface IJourneyDetailDto {
  totalOfHours: string;
  totalOfTransactions: number;
  totalOfDiscounts: number;
  journeys: IJourneyDto[];
}
