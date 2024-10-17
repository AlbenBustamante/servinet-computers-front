import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IAuthRequest, IAuthResponse } from '@models/auth.model';
import { IUserReq, IUserRes } from '@models/user.model';
import { TokenService } from './token.service';
import { MyCashService } from './my-cash.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl: string = `${environment.apiUrl}/auth`;
  private readonly userUrl: string = `${environment.apiUrl}/users`;
  readonly loggedIn = signal<IUserRes | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
    private readonly myCashService: MyCashService
  ) {}

  register(req: IUserReq) {
    return this.http.post<IUserRes>(`${this.authUrl}/register`, req);
  }

  login(req: IAuthRequest) {
    return this.http
      .post<IAuthResponse>(`${this.authUrl}/sign-in`, req)
      .pipe(tap((res) => this.tokenService.save(res.jwt)));
  }

  logout() {
    this.myCashService.currentCashRegister.set(undefined);
    this.myCashService.myCashRegisters.set(undefined);
    this.myCashService.cashRegisterStatus.set(undefined);
    this.loggedIn.set(null);
    localStorage.clear();
    this.tokenService.remove();

    /*return this.http
      .post<Boolean>(`${this.authUrl}/sign-out`, null, {
        context: checkToken(),
      })
      .pipe(tap(() => this.tokenService.remove()));*/
  }

  getLoggedIn() {
    return this.http
      .get<IUserRes>(`${this.userUrl}/${this.tokenService.getInfo().id}`, {
        context: checkToken(),
      })
      .pipe(tap((res) => this.loggedIn.set(res)));
  }
}
