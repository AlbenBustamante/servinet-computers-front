import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IPlatformBalanceRes,
  IUpdatePlatformBalanceDto,
} from '@models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class PlatformBalanceService {
  private readonly url: string = `${environment.apiUrl}/platform-balances`;

  constructor(private readonly http: HttpClient) {}

  update(balanceId: number, dto: IUpdatePlatformBalanceDto) {
    return this.http.patch<IPlatformBalanceRes>(
      `${this.url}/${balanceId}`,
      dto,
      { context: checkToken() }
    );
  }
}
