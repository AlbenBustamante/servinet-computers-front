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
  readonly cashRegisterDetails = signal<ICashRegisterDetailRes[]>([]);

  constructor(private readonly baseService: BaseService) {
    this.form = this.baseService.defaultForm();
  }
}
