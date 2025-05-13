import { IResponse } from './response.model';
import { IUserRes } from './user.model';

export interface ITempCodeRes extends IResponse<number> {
  code: number;
  usedBy: IUserRes | null;
}
