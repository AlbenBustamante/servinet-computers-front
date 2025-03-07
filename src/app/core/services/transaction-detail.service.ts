import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
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
    return this.http.post<ITransactionDetailRes>(this.url, req, {
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
}
