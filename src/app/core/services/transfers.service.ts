import { Injectable, signal } from '@angular/core';
import {
  IAvailableTransfersDto,
  ICashTransferDto,
} from '@models/cash-transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {
  readonly availableTransfers = signal<IAvailableTransfersDto | undefined>(
    undefined
  );
  readonly cashTransfers = signal<ICashTransferDto[]>([]);

  constructor() {}
}
