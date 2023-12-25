import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthRequest, IAuthResponse } from '../models/auth.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url: string = `${environment.apiUrl}/auth`;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  login(req: IAuthRequest): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(`${this.url}/sign-in`, req)
      .pipe(tap((res) => this.tokenService.save(res.jwt)));
  }
}
