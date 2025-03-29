import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IBase } from '@models/base.model';
import {
  ICashRegisterDetailRes,
  ICashRegisterReq,
  ICashRegisterRes,
  IUpdateCashRegisterDto,
} from '@models/cash-register.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterService {
  private readonly url = `${environment.apiUrl}/cash-registers`;
  readonly cashRegisters = signal<ICashRegisterRes[]>([]);
  readonly updateCashRegisterForm: FormGroup;
  readonly cashRegisterToUpdateId = signal<number>(-1);
  readonly updateCashRegisterLoading = signal<boolean>(false);

  constructor(
    private readonly http: HttpClient,
    private readonly fb: FormBuilder
  ) {
    this.updateCashRegisterForm = this.fb.group({
      description: ['', Validators.required],
      disabled: [false, Validators.required],
    });
  }

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

  getMovements(cashRegisterId: number) {
    return this.http.get<ICashRegisterDetailRes[]>(
      `${this.url}/${cashRegisterId}/movements`,
      { context: checkToken() }
    );
  }

  update(id: number, req: IUpdateCashRegisterDto) {
    return this.http
      .patch<ICashRegisterRes>(`${this.url}/${id}`, req, {
        context: checkToken(),
      })
      .pipe(
        tap((cashRegister) =>
          this.cashRegisters.update((prevValue) => {
            const index = prevValue.findIndex(
              (cr) => cr.id === cashRegister.id
            );

            if (index > -1) {
              prevValue[index] = cashRegister;
            }

            return prevValue;
          })
        )
      );
  }

  delete(id: number) {
    return this.http
      .delete<boolean>(`${this.url}/${id}`, { context: checkToken() })
      .pipe(
        tap((_) =>
          this.cashRegisters.update((prevValue) => {
            const index = prevValue.findIndex((cr) => cr.id === id);

            if (index > -1) {
              prevValue.splice(index, 1);
            }

            return prevValue;
          })
        )
      );
  }
}
