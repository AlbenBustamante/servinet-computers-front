import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IAuthRequest, IAuthResponse } from '@models/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { IPageResponse } from '@models/response.model';
import { IUserReq, IUserRes } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';
import { AuthToken } from '@models/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl: string = `${environment.apiUrl}/auth`;
  private readonly campusUrl: string = `${environment.apiUrl}/campuses`;
  private readonly userUrl: string = `${environment.apiUrl}/users`;
  user$ = new BehaviorSubject<IUserRes | null>(null);

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
    return this.http
      .post<IAuthResponse>(`${this.authUrl}/sign-in`, req)
      .pipe(tap((res) => this.tokenService.save(res.jwt)));
  }

  logout() {
    return this.http
      .post<Boolean>(`${this.authUrl}/sign-out`, null, {
        context: checkToken(),
      })
      .pipe(tap(() => this.tokenService.remove()));
  }

  getUser() {
    const { type, id } = this.tokenService.getInfo();

    if (type === AuthToken.USER) {
      return this.http
        .get<IPageResponse<IUserRes>>(`${this.userUrl}/${id}`, {
          context: checkToken(),
        })
        .pipe(tap((res) => this.user$.next(res.data.results[0])));
    }

    return null;
  }
}
