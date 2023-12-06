import { Injectable } from '@angular/core';
import { IPlatformReq, IPlatformRes } from '../models/platform.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPageResponse } from '../models/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly url: string = `${environment.apiUrl}/platforms`;

  constructor(private readonly http: HttpClient) {}

  register(req: IPlatformReq): Observable<IPageResponse<IPlatformRes>> {
    return this.http.post<IPageResponse<IPlatformRes>>(this.url, req);
  }

  getAll(): Observable<IPageResponse<IPlatformRes>> {
    return this.http.get<IPageResponse<IPlatformRes>>(this.url);
  }

  update(
    platformId: number,
    req: IPlatformReq
  ): Observable<IPageResponse<IPlatformRes>> {
    return this.http.patch<IPageResponse<IPlatformRes>>(
      `${this.url}/${platformId}`,
      req
    );
  }

  delete(platformId: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.url}/${platformId}`);
  }
}
