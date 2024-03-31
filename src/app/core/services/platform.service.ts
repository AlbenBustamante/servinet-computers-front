import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IPlatformReq, IPlatformRes } from '@models/platform.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly url: string = `${environment.apiUrl}/platforms`;
  readonly platforms = signal<IPlatformRes[]>([]);

  constructor(private readonly http: HttpClient) {}

  register(req: IPlatformReq) {
    return this.http
      .post<IPlatformRes>(this.url, req, {
        context: checkToken(),
      })
      .pipe(
        tap((res) => this.platforms.update((prevValue) => [...prevValue, res]))
      );
  }

  getAll() {
    return this.http
      .get<IPlatformRes[]>(this.url, {
        context: checkToken(),
      })
      .pipe(tap((res) => this.platforms.set(res)));
  }

  update(platformId: number, req: IPlatformReq) {
    return this.http.patch<IPlatformRes>(`${this.url}/${platformId}`, req, {
      context: checkToken(),
    });
  }

  delete(platformId: number) {
    return this.http.delete<Boolean>(`${this.url}/${platformId}`, {
      context: checkToken(),
    });
  }
}
