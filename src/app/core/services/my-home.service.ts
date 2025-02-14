import { Injectable, signal } from '@angular/core';
import {
  IAvailableTransfersDto,
  ICashTransferDto,
} from '@models/cash-transfer.model';
import { IExpenseRes } from '@models/expense.model';
import {
  ITransactionDetailRes,
  ITransactionRes,
} from '@models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class MyHomeService {
  readonly loading = signal<boolean>(false);
  readonly expenses = signal<IExpenseRes[]>([]);
  readonly details = signal<ITransactionDetailRes[]>([]);
  readonly transactions = signal<ITransactionRes[]>([]);
  readonly availableTransfers = signal<IAvailableTransfersDto | undefined>(
    undefined
  );
  readonly cashTransfers = signal<ICashTransferDto[]>([]);

  constructor() {}
}
