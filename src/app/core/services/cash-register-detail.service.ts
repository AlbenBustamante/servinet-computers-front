import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IAlreadyExistsCashRegisterDetailDto,
  ICashRegisterDetailReportsDto,
  ICashRegisterDetailReq,
  ICashRegisterDetailRes,
  ICashRegisterReq,
  IMyCashRegistersReports,
} from '@models/cash-register.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterDetailService {
  private readonly url = `${environment.apiUrl}/cash-register-details`;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  register(req: ICashRegisterDetailReq) {
    req.userId = this.tokenService.getInfo().id;

    return this.http.post<IMyCashRegistersReports>(this.url, req, {
      context: checkToken(),
    });
  }

  getById(cashRegisterDetailId: number) {
    return this.http.get<ICashRegisterDetailRes>(
      `${this.url}/${cashRegisterDetailId}`,
      { context: checkToken() }
    );
  }

  getReports(cashRegisterDetailId: number) {
    return this.http.get<ICashRegisterDetailReportsDto>(
      `${this.url}/${cashRegisterDetailId}/reports`,
      { context: checkToken() }
    );
  }

  alreadyExists() {
    return this.http.get<IAlreadyExistsCashRegisterDetailDto>(
      `${this.url}/already-exists`,
      { context: checkToken() }
    );
  }

  updateHours(req: ICashRegisterReq) {
    return this.http.put<ICashRegisterDetailRes>(this.url, req, {
      context: checkToken(),
    });
  }

  delete(cashRegisterDetailId: number) {
    return this.http.delete<boolean>(`${this.url}/${cashRegisterDetailId}`, {
      context: checkToken(),
    });
  }
}
