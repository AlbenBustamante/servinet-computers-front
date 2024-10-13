import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IExpenseReq, IExpenseRes } from '@models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly url = `${environment.apiUrl}/expenses`;

  constructor(private readonly http: HttpClient) {}

  register(req: IExpenseReq) {
    return this.http.post<IExpenseRes>(this.url, req, {
      context: checkToken(),
    });
  }
}
