import { Injectable, signal } from '@angular/core';
import { IAvailableTransfersDto } from '@models/cash-transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {
  readonly availableTransfers = signal<IAvailableTransfersDto | undefined>(
    undefined
  );

  constructor() {}
}
