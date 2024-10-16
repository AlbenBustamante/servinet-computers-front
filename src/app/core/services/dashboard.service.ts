import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IDashboardResponse } from '@models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly url = `${environment.apiUrl}/dashboard`;

  constructor(private readonly http: HttpClient) {}

  getDashboard() {
    return this.http.get<IDashboardResponse>(this.url, {
      context: checkToken(),
    });
  }
}
