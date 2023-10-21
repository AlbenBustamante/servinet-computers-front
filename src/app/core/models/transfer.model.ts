export interface ITransferReq {
  campusId: number;
  platformId: number;
  value: number;
}

export interface ITransferRes {
  id: number;
  campusId: number;
  platformName: string;
  value: string;
}
