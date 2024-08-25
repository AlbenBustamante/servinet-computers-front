import { HttpClient } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IPlatformTransferReq,
  IPlatformTransferRes,
} from '@models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class PlatformTransferService {
  private readonly url: string = `${environment.apiUrl}/platform-transfers`;

  reports = computed(() => {
    return {};
  });

  constructor(private readonly http: HttpClient) {}

  register(req: IPlatformTransferReq) {
    return this.http.post<IPlatformTransferRes>(this.url, req, {
      context: checkToken(),
    });
  }

  get(transferId: number) {
    return this.http.get<IPlatformTransferRes>(`${this.url}/${transferId}`, {
      context: checkToken(),
    });
  }

  update(transferId: number, req: IPlatformTransferReq) {
    return this.http.patch<IPlatformTransferRes>(
      `${this.url}/${transferId}`,
      req,
      { context: checkToken() }
    );
  }

  delete(transferId: number) {
    return this.http.delete<Boolean>(`${this.url}/${transferId}`, {
      context: checkToken(),
    });
  }
}
