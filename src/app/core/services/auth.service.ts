import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IAuthRequest, IAuthResponse } from '@models/auth.model';
import { IPageResponse } from '@models/response.model';
import { IUserReq, IUserRes } from '@models/user.model';
import { AuthToken } from '@models/enums';
import { TokenService } from './token.service';
import { ICampusRes } from '@models/campus.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl: string = `${environment.apiUrl}/auth`;
  private readonly campusUrl: string = `${environment.apiUrl}/campuses`;
  private readonly userUrl: string = `${environment.apiUrl}/users`;
  readonly userLogged = signal<IUserRes | undefined>(undefined);
  readonly campusLogged = signal<ICampusRes | undefined>(undefined);

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

        const { type } = this.tokenService.getInfo();

        if (type === AuthToken.CAMPUS) {
          this.getCampusLogged().subscribe();
        }

        if (type === AuthToken.USER) {
          this.getUserLogged().subscribe();
        }
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

  private getUserLogged() {
    const { id } = this.tokenService.getInfo();
    return this.http
      .get<IPageResponse<IUserRes>>(`${this.userUrl}/${id}`, {
        context: checkToken(),
      })
      .pipe(tap((res) => this.userLogged.set(res.data.results[0])));
  }

  private getCampusLogged() {
    const { id } = this.tokenService.getInfo();

    return this.http
      .get<IPageResponse<ICampusRes>>(`${this.campusUrl}/${id}`, {
        context: checkToken(),
      })
      .pipe(tap((res) => this.campusLogged.set(res.data.results[0])));
  }
}
