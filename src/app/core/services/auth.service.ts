import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IAuthRequest, IAuthResponse } from '@models/auth.model';
import { IPageResponse } from '@models/response.model';
import { IUserReq, IUserRes } from '@models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl: string = `${environment.apiUrl}/auth`;
  private readonly userUrl: string = `${environment.apiUrl}/users`;
  readonly loggedIn = signal<IUserRes | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  register(req: IUserReq) {
    return this.http.post<IPageResponse<IUserRes>>(
      `${this.authUrl}/register`,
      req
    );
  }

  login(req: IAuthRequest) {
    return this.http.post<IAuthResponse>(`${this.authUrl}/sign-in`, req).pipe(
      tap((res) => {
        this.tokenService.save(res.jwt);
        this.getLoggedIn().subscribe();
      })
    );
  }

  logout() {
    return this.http
      .post<Boolean>(`${this.authUrl}/sign-out`, null, {
        context: checkToken(),
      })
      .pipe(tap(() => this.tokenService.remove()));
  }

  private getLoggedIn() {
    return this.http
      .get<IUserRes>(`${this.userUrl}/${this.tokenService.getInfo().id}`)
      .pipe(tap((res) => this.loggedIn.set(res)));
  }
}
