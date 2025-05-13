import { Injectable, signal } from '@angular/core';
import { IDetailedCashRegisterReportsDto } from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterDetailMovementService {
  readonly movement = signal<IDetailedCashRegisterReportsDto | undefined>(
    undefined
  );

  constructor() {}
}
