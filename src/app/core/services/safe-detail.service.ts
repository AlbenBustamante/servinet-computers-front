import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IBase } from '@models/base.model';
import { ISafeDetailRes } from '@models/safe.model';

@Injectable({
  providedIn: 'root',
})
export class SafeDetailService {
  private readonly url = `${environment.apiUrl}/safe-details`;

  constructor(private readonly http: HttpClient) {}

  loadDetails() {
    return this.http.get<ISafeDetailRes[]>(`${this.url}/load`, {
      context: checkToken(),
    });
  }

  updateBase(safeDetailId: number, base: IBase) {
    return this.http.put<ISafeDetailRes>(
      `${this.url}/${safeDetailId}/base`,
      base,
      {
        context: checkToken(),
      }
    );
  }
}
