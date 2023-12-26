import { Injectable } from '@angular/core';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

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
}
