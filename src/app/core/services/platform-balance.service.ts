import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IPlatformBalanceReq,
  IPlatformBalanceRes,
} from '@models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class PlatformBalanceService {
  private readonly url: string = `${environment.apiUrl}/platform-balances`;

  constructor(private readonly http: HttpClient) {}

  update(balanceId: number, req: IPlatformBalanceReq) {
    return this.http.patch<IPlatformBalanceRes>(
      `${this.url}/${balanceId}`,
      req,
      { context: checkToken() }
    );
  }
}
