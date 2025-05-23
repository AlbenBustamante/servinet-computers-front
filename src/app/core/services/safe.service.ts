import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { ISafeDetailRes, ISafeReq, ISafeRes } from '@models/safe.model';
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

  getDetails(safeId: number) {
    return this.http.get<ISafeDetailRes[]>(`${this.url}/${safeId}/details`, {
      context: checkToken(),
    });
  }

  delete(safeId: number) {
    return this.http
      .delete<void>(`${this.url}/${safeId}`, {
        context: checkToken(),
      })
      .pipe(
        tap(() =>
          this.safes.update((prevSafes) => {
            const index = prevSafes.findIndex((safe) => safe.id === safeId);

            if (index > -1) {
              prevSafes.splice(index, 1);
            }

            return prevSafes;
          })
        )
      );
  }
}
