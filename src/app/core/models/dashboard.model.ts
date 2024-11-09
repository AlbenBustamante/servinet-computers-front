import { IPlatformStatsDto } from './platform.model';

export interface IDashboardResponse {
  totalBalance: number;
  platformsStats: IPlatformStatsDto[];
  platformBalancesTotal: number;
  cashRegistersTotal: number;
  safesTotal: number;
}
