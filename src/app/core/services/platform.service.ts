import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IPlatformReq, IPlatformRes } from '@models/platform.model';
import { IPageResponse } from '@models/response.model';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly url: string = `${environment.apiUrl}/platforms`;

  constructor(private readonly http: HttpClient) {}

  register(req: IPlatformReq) {
    return this.http.post<IPageResponse<IPlatformRes>>(this.url, req, {
      context: checkToken(),
    });
  }

  getAll() {
    return this.http.get<IPageResponse<IPlatformRes>>(this.url, {
      context: checkToken(),
    });
  }

  update(platformId: number, req: IPlatformReq) {
    return this.http.patch<IPageResponse<IPlatformRes>>(
      `${this.url}/${platformId}`,
      req,
      { context: checkToken() }
    );
  }

  delete(platformId: number) {
    return this.http.delete<Boolean>(`${this.url}/${platformId}`, {
      context: checkToken(),
    });
  }
}
