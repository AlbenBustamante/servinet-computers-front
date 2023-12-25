import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly tokenKey: string = 'token';

  constructor() {}

  save(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  get() {
    return localStorage.getItem(this.tokenKey);
  }

  remove() {
    localStorage.removeItem(this.tokenKey);
  }
}
