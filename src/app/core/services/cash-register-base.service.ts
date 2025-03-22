import { Injectable, signal } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';
import { BaseService } from './base.service';
import { IBaseDetail } from '@models/base.model';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterBaseService {
  readonly form;
  readonly baseDetail = signal<IBaseDetail | undefined>(undefined);
  readonly selectedCashRegister = signal<ICashRegisterDetailRes | undefined>(
    undefined
  );

  private readonly base;

  constructor(private readonly baseService: BaseService) {
    this.form = this.baseService.defaultForm();
    this.base = this.baseService.cashBase;
  }

  resetBase() {
    this.base.set(this.baseService.defaultBase());
    this.baseDetail.set({ amount: 0, total: 0 });
    this.baseService.updateForm(this.form, BaseService.empty);
  }
}
