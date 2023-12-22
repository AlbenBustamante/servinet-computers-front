export interface IDashboardResponse {
  total: string;
  campuses: {
    numeral: number;
    total: string;
  }[];
  platforms: {
    platformId: number;
    platformName: string;
    transfersAmount: number;
    total: string;
  }[];
}
