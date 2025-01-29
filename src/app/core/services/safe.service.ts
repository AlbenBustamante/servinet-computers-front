import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { ISafeReq, ISafeRes } from '@models/safe.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SafeService {
  private readonly url = `${environment.apiUrl}/safes`;
  readonly safes = signal<ISafeRes[]>([]);

  constructor(private readonly http: HttpClient) {}

  register(req: ISafeReq) {
    return this.http
      .post<ISafeRes>(this.url, req, { context: checkToken() })
      .pipe(
        tap((safe) => this.safes.update((prevSafes) => [...prevSafes, safe]))
      );
  }

  getAll() {
    return this.http
      .get<ISafeRes[]>(this.url, { context: checkToken() })
      .pipe(tap((safes) => this.safes.set(safes)));
  }
}
