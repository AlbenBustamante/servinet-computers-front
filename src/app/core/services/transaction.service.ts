import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  ITransactionDetailReq,
  ITransactionRes,
} from '@models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly url = `${environment.apiUrl}/transactions`;

  constructor(private readonly http: HttpClient) {}

  register(req: ITransactionDetailReq) {
    return this.http.post<ITransactionDetailReq>(this.url, req, {
      context: checkToken(),
    });
  }

  getAll() {
    return this.http.get<ITransactionRes[]>(this.url, {
      context: checkToken(),
    });
  }
}
