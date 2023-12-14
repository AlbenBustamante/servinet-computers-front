import { SortDirection } from './enums';

export interface IPagination {
  size?: number;
  page?: number;
  direction?: SortDirection;
  property?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IDateRange {
  startDate?: Date;
  endDate?: Date;
}
