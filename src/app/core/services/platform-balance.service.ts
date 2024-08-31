import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IPlatformBalanceReq,
  IPlatformBalanceRes,
} from '@models/platform.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatformBalanceService {
  private readonly url: string = `${environment.apiUrl}/platform-balances`;
  readonly editing = signal<boolean>(false);
  readonly selectedPlatformBalance = signal<IPlatformBalanceRes | null>(null);
  readonly selectedPlatformBalanceIndex = signal<number | null>(null);
  readonly platformBalances = signal<IPlatformBalanceRes[]>([]);

  constructor(private readonly http: HttpClient) {}

  loadInitialBalances() {
    return this.http
      .post<IPlatformBalanceRes[]>(this.url, null, {
        context: checkToken(),
      })
      .pipe(
        tap((platformBalances) => this.platformBalances.set(platformBalances))
      );
  }

  update(balanceId: number, req: IPlatformBalanceReq) {
    return this.http.patch<IPlatformBalanceRes>(
      `${this.url}/${balanceId}`,
      req,
      { context: checkToken() }
    );
  }
}
