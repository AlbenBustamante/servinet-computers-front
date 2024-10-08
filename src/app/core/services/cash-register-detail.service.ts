import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  ICashRegisterBaseRes,
  ICashRegisterDetailReq,
  ICashRegisterDetailRes,
  ICashRegisterReq,
} from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterDetailService {
  private readonly url = `${environment.apiUrl}/cash-register-details`;

  constructor(private readonly http: HttpClient) {}

  register(req: ICashRegisterDetailReq) {
    return this.http.post<ICashRegisterDetailRes>(this.url, req, {
      context: checkToken(),
    });
  }

  get() {
    return this.http.get<ICashRegisterDetailRes>(this.url, {
      context: checkToken(),
    });
  }

  isAlreadyCreated() {
    return this.http.get<boolean>(`${this.url}/already-exists`, {
      context: checkToken(),
    });
  }

  updateHours(req: ICashRegisterReq) {
    return this.http.put<ICashRegisterDetailRes>(this.url, req, {
      context: checkToken(),
    });
  }

  delete(cashRegisterDetailId: number) {
    return this.http.delete<boolean>(`${this.url}/${cashRegisterDetailId}`, {
      context: checkToken(),
    });
  }

  getBase(id: number) {
    return this.http.get<ICashRegisterBaseRes>(`${this.url}/${id}/base`, {
      context: checkToken(),
    });
  }
}
