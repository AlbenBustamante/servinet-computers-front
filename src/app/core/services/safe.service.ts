import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  ISafeBaseReq,
  ISafeBaseRes,
  ISafeReq,
  ISafeRes,
} from '@models/safe.model';

@Injectable({
  providedIn: 'root',
})
export class SafeService {
  private readonly url = `${environment.apiUrl}/safes`;

  constructor(private readonly http: HttpClient) {}

  register(req: ISafeReq) {
    return this.http.post<ISafeRes>(this.url, req, { context: checkToken() });
  }

  getAll() {
    return this.http.get<ISafeRes[]>(this.url, { context: checkToken() });
  }

  addBase(safeId: number, req: ISafeBaseReq) {
    return this.http.post<ISafeBaseRes>(`${this.url}/${safeId}/base`, req, {
      context: checkToken(),
    });
  }
}
