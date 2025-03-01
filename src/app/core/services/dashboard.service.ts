import { HttpClient, HttpParams } from '@angular/common/http';
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
  readonly loading = signal<boolean>(false);
  readonly dashboard = signal<IDashboardResponse | undefined>(undefined);
  readonly selectedProduct = signal<SelectedProduct>('platforms');

  constructor(private readonly http: HttpClient) {}

  getDashboard(date: string | undefined) {
    let params = new HttpParams();

    if (date) {
      params = params.append('date', date);
    }

    return this.http
      .get<IDashboardResponse>(this.url, {
        params: params,
        context: checkToken(),
      })
      .pipe(
        tap((dashboard) => {
          console.log({ dashboard });
          this.dashboard.set(dashboard);
        })
      );
  }
}
