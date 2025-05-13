import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IAdmCashRegistersDto,
  IAlreadyExistsCashRegisterDetailDto,
  ICashRegisterDetailReportsDto,
  ICashRegisterDetailReq,
  ICashRegisterDetailRes,
  ICloseCashRegisterDetailDto,
  IDetailedCashRegisterReportsDto,
  IMyCashRegistersReports,
  IUpdateCashRegisterDetailBaseDto,
} from '@models/cash-register.model';
import { TokenService } from './token.service';
import { IBase } from '@models/base.model';
import { IExpenseRes } from '@models/expense.model';
import { ITransactionDetailRes } from '@models/transaction.model';
import { ICashTransferDto } from '@models/cash-transfer.model';
import { IPageResponse } from '@models/response.model';

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

  getAdmCashRegisterDetails() {
    return this.http.get<IAdmCashRegistersDto>(`${this.url}/adm`, {
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
      this.urlIdPath(cashRegisterDetailId, 'reports'),
      { context: checkToken() }
    );
  }

  getDetailedReports(cashRegisterDetailId: number) {
    return this.http.get<IDetailedCashRegisterReportsDto>(
      this.urlIdPath(cashRegisterDetailId, 'detailed-reports'),
      { context: checkToken() }
    );
  }

  getExpenses(cashRegisterDetailId: number, page: number = 0) {
    const params = new HttpParams().append('pageNumber', page);

    return this.http.get<IPageResponse<IExpenseRes>>(
      this.urlIdPath(cashRegisterDetailId, 'expenses'),
      { params, context: checkToken() }
    );
  }

  getTransactions(cashRegisterDetailId: number, page: number = 0) {
    const params = new HttpParams().append('pageNumber', page);

    return this.http.get<IPageResponse<ITransactionDetailRes>>(
      this.urlIdPath(cashRegisterDetailId, 'transactions'),
      { params, context: checkToken() }
    );
  }

  getCashTransfers(cashRegisterDetailId: number, page: number = 0) {
    const params = new HttpParams().append('pageNumber', page);

    return this.http.get<IPageResponse<ICashTransferDto>>(
      this.urlIdPath(cashRegisterDetailId, 'cash-transfers'),
      { params, context: checkToken() }
    );
  }

  alreadyExists() {
    return this.http.get<IAlreadyExistsCashRegisterDetailDto>(
      `${this.url}/already-exists`,
      { context: checkToken() }
    );
  }

  startBreak(cashRegisterDetailId: number) {
    return this.http.put<ICashRegisterDetailRes>(
      this.urlIdPath(cashRegisterDetailId, 'start-break'),
      undefined,
      { context: checkToken() }
    );
  }

  endBreak(cashRegisterDetailId: number) {
    return this.http.put<ICashRegisterDetailRes>(
      this.urlIdPath(cashRegisterDetailId, 'end-break'),
      undefined,
      { context: checkToken() }
    );
  }

  updateBase(
    cashRegisterDetailId: number,
    updateCashRegisterDetailBase: IUpdateCashRegisterDetailBaseDto
  ) {
    return this.http.put<ICashRegisterDetailRes>(
      this.urlIdPath(cashRegisterDetailId, 'update-base'),
      updateCashRegisterDetailBase,
      { context: checkToken() }
    );
  }

  close(
    cashRegisterDetailId: number,
    closeCashRegisterDetailDto: ICloseCashRegisterDetailDto
  ) {
    return this.http.put<ICashRegisterDetailReportsDto>(
      this.urlIdPath(cashRegisterDetailId, 'close'),
      closeCashRegisterDetailDto,
      { context: checkToken() }
    );
  }

  delete(cashRegisterDetailId: number) {
    return this.http.delete<boolean>(`${this.url}/${cashRegisterDetailId}`, {
      context: checkToken(),
    });
  }

  private urlIdPath = (cashRegisterDetailId: number, path: string): string =>
    `${this.url}/${cashRegisterDetailId}/${path}`;
}
