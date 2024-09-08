import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IReportsRes, IUserReq, IUserRes } from '@models/user.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url: string = `${environment.apiUrl}/users`;
  readonly users = signal<IUserRes[]>([]);

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService
  ) {}

  getAll() {
    return this.http
      .get<IUserRes[]>(this.url, { context: checkToken() })
      .pipe(tap((res) => this.users.set(res)));
  }

  getReports() {
    const code = this.authService.loggedIn()?.code;

    return this.http.get<IReportsRes>(`${this.url}/${code}/reports`, {
      context: checkToken(),
    });
  }

  update(req: IUserReq) {
    return this.http.patch<IUserRes>(
      `${this.url}/${this.tokenService.getInfo().id}`,
      req,
      { context: checkToken() }
    );
  }

  delete() {
    return this.http.delete<Boolean>(
      `${this.url}/${this.tokenService.getInfo().id}`,
      { context: checkToken() }
    );
  }
}
