import { ICashRegisterDetailRes } from './cash-register.model';
import { IPlatformStatsDto } from './platform.model';
import { ISafeDetailRes } from './safe.model';

export interface IDashboardResponse {
  totalBalance: number;
  platformBalancesTotal: number;
  cashRegistersTotal: number;
  safesTotal: number;
  platformsStats: IPlatformStatsDto[];
  cashRegisterDetails: ICashRegisterDetailRes[];
  safeDetails: ISafeDetailRes[];
}
