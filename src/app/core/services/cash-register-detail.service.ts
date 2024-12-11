import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IAlreadyExistsCashRegisterDetailDto,
  ICashRegisterDetailReportsDto,
  ICashRegisterDetailReq,
  ICashRegisterDetailRes,
  IMyCashRegistersReports,
} from '@models/cash-register.model';
import { TokenService } from './token.service';
import { IBase } from '@models/base.model';
import { IExpenseRes } from '@models/expense.model';

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

  getExpenses(cashRegisterDetailId: number) {
    return this.http.get<IExpenseRes[]>(
      `${this.url}/${cashRegisterDetailId}/expenses`,
      {
        context: checkToken(),
      }
    );
  }

  alreadyExists() {
    return this.http.get<IAlreadyExistsCashRegisterDetailDto>(
      `${this.url}/already-exists`,
      { context: checkToken() }
    );
  }

  startBreak(cashRegisterDetailId: number) {
    return this.http.patch<ICashRegisterDetailRes>(
      `${this.url}/${cashRegisterDetailId}/start-break`,
      undefined,
      { context: checkToken() }
    );
  }

  endBreak(cashRegisterDetailId: number) {
    return this.http.patch<ICashRegisterDetailRes>(
      `${this.url}/${cashRegisterDetailId}/end-break`,
      undefined,
      { context: checkToken() }
    );
  }

  close(cashRegisterDetailId: number, base: IBase) {
    return this.http.patch<ICashRegisterDetailReportsDto>(
      `${this.url}/${cashRegisterDetailId}/close`,
      base,
      { context: checkToken() }
    );
  }

  delete(cashRegisterDetailId: number) {
    return this.http.delete<boolean>(`${this.url}/${cashRegisterDetailId}`, {
      context: checkToken(),
    });
  }
}
