import { Injectable, signal } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  readonly loading = signal<boolean>(false);
  readonly journeys = signal<ICashRegisterDetailRes[]>([]);

  constructor() {}
}
