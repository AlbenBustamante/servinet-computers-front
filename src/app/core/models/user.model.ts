import { Role } from './enums';
import { IPlatformTransferRes } from './platform.model';
import { IResponse } from './response.model';

export interface IUserReq {
  name: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  role: Role;
}

export interface IUserRes extends IResponse {
  name: string;
  lastName: string;
  code: string;
  role: Role;
}

export interface IReportsRes {
  platformTransfers: IPlatformTransferRes[];
}
