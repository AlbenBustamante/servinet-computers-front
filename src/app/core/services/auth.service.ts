import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthRequest, IAuthResponse } from '../models/auth.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { IPageResponse } from '../models/response.model';
import { IUserReq, IUserRes } from '../models/user.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url: string = `${environment.apiUrl}/auth`;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  register(req: IUserReq) {
    return this.http.post<IPageResponse<IUserRes>>(`${this.url}/register`, req);
  }

  login(req: IAuthRequest) {
    return this.http
      .post<IAuthResponse>(`${this.url}/sign-in`, req)
      .pipe(tap((res) => this.tokenService.save(res.jwt)));
  }

  logout() {
    return this.http.post<Boolean>(`${this.url}/sign-out`, null, {
      context: checkToken(),
    });
  }
}
