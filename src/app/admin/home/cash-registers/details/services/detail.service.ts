import { Injectable, signal } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  readonly loading = signal<boolean>(false);
  readonly detail = signal<ICashRegisterDetailRes | undefined>(undefined);
  readonly date = signal<Date>(new Date());

  constructor() {}
}
