import { IPlatformBalanceRes } from './platform.model';

export interface IDashboardResponse {
  totalBalance: number;
  platformBalances: IPlatformBalanceRes[];
}
