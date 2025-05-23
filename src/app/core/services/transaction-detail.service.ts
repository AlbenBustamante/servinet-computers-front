import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IPageResponse } from '@models/response.model';
import {
  ITransactionDetailReq,
  ITransactionDetailRes,
  IUpdateTransactionDetailDto,
} from '@models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionDetailService {
  private readonly url = `${environment.apiUrl}/transaction-details`;

  constructor(private readonly http: HttpClient) {}

  register(req: ITransactionDetailReq) {
    return this.http.post<IPageResponse<ITransactionDetailRes>>(this.url, req, {
      context: checkToken(),
    });
  }

  update(transactionDetailId: number, dto: IUpdateTransactionDetailDto) {
    return this.http.patch<ITransactionDetailRes>(
      `${this.url}/${transactionDetailId}`,
      dto,
      { context: checkToken() }
    );
  }

  delete(transactionDetailId: number, tempCode: number) {
    let params = new HttpParams();

    params = params.append('tempCode', tempCode);

    return this.http.delete<void>(`${this.url}/${transactionDetailId}`, {
      params,
      context: checkToken(),
    });
  }
}
