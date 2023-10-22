export interface ITransferReq {
  campusId: number;
  platformName: string;
  value: number;
}

export interface ITransferRes {
  id: number;
  campusId: number;
  platformName: string;
  value: string;
}
