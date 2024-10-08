import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  ICashRegisterReq,
  ICashRegisterRes,
} from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterService {
  private readonly url = `${environment.apiUrl}/cash-registers`;

  constructor(private readonly http: HttpClient) {}

  register(req: ICashRegisterReq) {
    return this.http.post<ICashRegisterRes>(this.url, req, {
      context: checkToken(),
    });
  }

  getAll(enabled: boolean) {
    return this.http.get<ICashRegisterRes[]>(`${this.url}/${enabled}`, {
      context: checkToken(),
    });
  }

  update(id: number, req: ICashRegisterReq) {
    return this.http.put<ICashRegisterRes>(`${this.url}/${id}`, req, {
      context: checkToken(),
    });
  }

  changeStatus(req: ICashRegisterReq) {
    return this.http.patch<ICashRegisterRes>(this.url, req, {
      context: checkToken(),
    });
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }
}
