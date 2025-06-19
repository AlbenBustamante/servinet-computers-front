import { Injectable, signal } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private _cashRegisterId = 0;
  readonly loading = signal<boolean>(false);
  readonly details = signal<ICashRegisterDetailRes[]>([]);
  readonly selectedDetail = signal<ICashRegisterDetailRes | undefined>(
    undefined
  );
  readonly date = signal<Date>(new Date());

  constructor() {}

  set cashRegisterId(id: number) {
    this._cashRegisterId = id;
  }

  get cashRegisterId() {
    return this._cashRegisterId;
  }
}
