import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IBase } from '@models/base.model';
import {
  ICashRegisterReq,
  ICashRegisterRes,
} from '@models/cash-register.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterService {
  private readonly url = `${environment.apiUrl}/cash-registers`;
  readonly cashRegisters = signal<ICashRegisterRes[]>([]);

  constructor(private readonly http: HttpClient) {}

  register(req: ICashRegisterReq) {
    return this.http
      .post<ICashRegisterRes>(this.url, req, {
        context: checkToken(),
      })
      .pipe(
        tap((cashRegister) =>
          this.cashRegisters.update((prevCashRegisters) => [
            ...prevCashRegisters,
            cashRegister,
          ])
        )
      );
  }

  getAll() {
    return this.http
      .get<ICashRegisterRes[]>(this.url, {
        context: checkToken(),
      })
      .pipe(tap((cashRegisters) => this.cashRegisters.set(cashRegisters)));
  }

  getLastBase(cashRegisterId: number) {
    return this.http.get<IBase>(`${this.url}/${cashRegisterId}/lastBase`, {
      context: checkToken(),
    });
  }

  update(id: number, req: ICashRegisterReq) {
    return this.http.patch<ICashRegisterRes>(`${this.url}/${id}`, req, {
      context: checkToken(),
    });
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }
}
