import { ICashRegisterDetailRes } from './cash-register.model';
import { IPlatformStatsDto } from './platform.model';

export interface IDashboardResponse {
  totalBalance: number;
  platformsStats: IPlatformStatsDto[];
  platformBalancesTotal: number;
  cashRegisterDetails: ICashRegisterDetailRes[];
  cashRegistersTotal: number;
  safesTotal: number;
}
