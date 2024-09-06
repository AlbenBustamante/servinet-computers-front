import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IDashboardResponse } from '@models/dashboard.model';
import { IPlatformBalanceRes } from '@models/platform.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly url = `${environment.apiUrl}/dashboard`;

  readonly totalBalance = signal<number | undefined>(undefined);
  readonly platformBalances = signal<IPlatformBalanceRes[]>([]);

  constructor(private readonly http: HttpClient) {}

  getDashboard() {
    return this.http
      .get<IDashboardResponse>(this.url, {
        context: checkToken(),
      })
      .pipe(
        tap((dashboard) => {
          this.totalBalance.set(dashboard.totalBalance);
          this.platformBalances.set(dashboard.platformBalances);
        })
      );
  }
}
