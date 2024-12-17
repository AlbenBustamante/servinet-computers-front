import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  ITransactionDetailReq,
  ITransactionDetailRes,
  ITransactionRes,
} from '@models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly url = `${environment.apiUrl}/transactions`;

  constructor(private readonly http: HttpClient) {}

  register(req: ITransactionDetailReq) {
    return this.http.post<ITransactionDetailRes>(this.url, req, {
      context: checkToken(),
    });
  }

  getAllDescriptions() {
    return this.http.get<string[]>(this.url, {
      context: checkToken(),
    });
  }
}
