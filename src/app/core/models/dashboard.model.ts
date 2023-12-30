export interface IDashboardResponse {
  total: string;
  campuses: ICampusDashboardResponse[];
  platforms: IPlatformDashboardResponse[];
}

export interface ICampusDashboardResponse {
  numeral: number;
  total: string;
}

export interface IPlatformDashboardResponse {
  platformId: number;
  platformName: string;
  transfersAmount: number;
  total: string;
}
