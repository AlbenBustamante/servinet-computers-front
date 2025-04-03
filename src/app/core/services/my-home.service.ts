import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  readonly cashTransfers = signal<ICashTransferDto[]>([]);
  readonly transactions = signal<ITransactionRes[]>([]);
  readonly availableTransfers = signal<IAvailableTransfersDto | undefined>(
    undefined
  );
  readonly updateTransactionDetailForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.updateTransactionDetailForm = this.fb.group({});
  }
}
