import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IExpenseReq,
  IExpenseRes,
  IUpdateExpenseDto,
} from '@models/expense.model';
import { IPageResponse } from '@models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly url = `${environment.apiUrl}/expenses`;

  constructor(private readonly http: HttpClient) {}

  register(req: IExpenseReq) {
    return this.http.post<IPageResponse<IExpenseRes>>(this.url, req, {
      context: checkToken(),
    });
  }

  update(expenseId: number, dto: IUpdateExpenseDto) {
    return this.http.patch<IExpenseRes>(`${this.url}/${expenseId}`, dto, {
      context: checkToken(),
    });
  }

  delete(expenseId: number, tempCode: string) {
    let params = new HttpParams();

    params = params.append('tempCode', Number(tempCode));

    return this.http.delete<void>(`${this.url}/${expenseId}`, {
      params,
      context: checkToken(),
    });
  }
}
