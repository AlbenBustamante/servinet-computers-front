import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IDashboardResponse } from '@models/dashboard.model';
import { tap } from 'rxjs';

export type SelectedProduct = 'platforms' | 'cash-registers' | 'safes';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly url = `${environment.apiUrl}/dashboard`;
  readonly dashboard = signal<IDashboardResponse | undefined>(undefined);
  readonly selectedProduct = signal<SelectedProduct>('platforms');

  constructor(private readonly http: HttpClient) {}

  getDashboard() {
    return this.http
      .get<IDashboardResponse>(this.url, {
        context: checkToken(),
      })
      .pipe(tap((dashboard) => this.dashboard.set(dashboard)));
  }
}
