import { Injectable, signal } from '@angular/core';
import { ICashRegisterDetailReportsAndMovementsDto } from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterDetailMovementService {
  readonly movement = signal<
    ICashRegisterDetailReportsAndMovementsDto | undefined
  >(undefined);

  constructor() {}
}
