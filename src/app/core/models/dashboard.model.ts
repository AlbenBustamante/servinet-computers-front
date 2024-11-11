import { ICashRegisterDetailRes } from './cash-register.model';
import { IPlatformStatsDto } from './platform.model';
import { ISafeRes } from './safe.model';

export interface IDashboardResponse {
  totalBalance: number;
  platformsStats: IPlatformStatsDto[];
  platformBalancesTotal: number;
  cashRegisterDetails: ICashRegisterDetailRes[];
  cashRegistersTotal: number;
  safes: ISafeRes[];
  safesTotal: number;
}
