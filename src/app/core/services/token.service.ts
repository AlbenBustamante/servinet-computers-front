import { Injectable } from '@angular/core';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { IJwtResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly tokenKey: string = 'token';

  constructor() {}

  save(token: string) {
    setCookie(this.tokenKey, token, {
      expires: 1,
      path: '/',
    });
  }

  get() {
    return getCookie(this.tokenKey);
  }

  remove() {
    removeCookie(this.tokenKey);
  }

  getInfo(): IJwtResponse {
    const token = getCookie(this.tokenKey);
    return jwtDecode(token ?? '');
  }
}
