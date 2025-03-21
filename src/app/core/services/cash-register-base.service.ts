import { Injectable, signal } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterBaseService {
  readonly form;
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
    this.baseService.updateForm(this.form, BaseService.empty);
  }
}
