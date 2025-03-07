import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { ITransactionRes } from '@models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly url = `${environment.apiUrl}/transactions`;

  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<ITransactionRes[]>(this.url, {
      context: checkToken(),
    });
  }
}
