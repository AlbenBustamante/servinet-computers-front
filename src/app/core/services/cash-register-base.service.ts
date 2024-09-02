import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  ICashRegisterBaseReq,
  ICashRegisterBaseRes,
} from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterBaseService {
  private readonly url = `${environment.apiUrl}/cash-register-bases`;

  constructor(private readonly http: HttpClient) {}

  register(req: ICashRegisterBaseReq) {
    return this.http.post<ICashRegisterBaseRes>(this.url, req, {
      context: checkToken(),
    });
  }
}
