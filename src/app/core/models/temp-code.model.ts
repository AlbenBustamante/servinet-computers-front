import { IResponse } from './response.model';

export interface ITempCodeRes extends IResponse {
  code: number;
  usedBy: number | null;
}
