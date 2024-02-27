import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IBalanceReq, IBalanceRes } from '@models/balance.model';
import { IPageResponse } from '@models/response.model';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private readonly url: string = `${environment.apiUrl}/balances`;

  constructor(private readonly http: HttpClient) {}

  update(balanceId: number, req: IBalanceReq) {
    return this.http.patch<IPageResponse<IBalanceRes>>(
      `${this.url}/${balanceId}`,
      req,
      { context: checkToken() }
    );
  }
}
