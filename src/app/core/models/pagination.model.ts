import { SortDirection } from './enums';

export interface IPagination {
  size?: number;
  page?: number;
  direction?: SortDirection;
  property?: string;
  startDate?: Date;
  endDate?: Date;
}
