import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IAvailableTransfersDto,
  ICashTransferDto,
} from '@models/cash-transfer.model';
import { TransactionDetailType } from '@models/enums';
import { IExpenseRes } from '@models/expense.model';
import { IPagination } from '@models/response.model';
import {
  ITransactionDetailRes,
  ITransactionRes,
} from '@models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class MyHomeService {
  readonly loading = signal<boolean>(false);
  readonly pagination = signal<IPagination | undefined>(undefined);
  readonly paginationLoading = signal<boolean>(false);
  readonly expenses = signal<IExpenseRes[]>([]);
  readonly details = signal<ITransactionDetailRes[]>([]);
  readonly cashTransfers = signal<ICashTransferDto[]>([]);
  readonly transactions = signal<ITransactionRes[]>([]);
  readonly availableTransfers = signal<IAvailableTransfersDto | undefined>(
    undefined
  );
  readonly updateTransactionDetailForm: FormGroup;
  readonly updateExpenseForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.updateTransactionDetailForm = this.fb.group({
      description: ['', Validators.required],
      type: [TransactionDetailType.DEPOSIT, Validators.required],
      value: ['', [Validators.required, Validators.min(0)]],
      commission: ['', Validators.min(0)],
      date: [null],
      tempCode: [null, Validators.required],
    });

    this.updateExpenseForm = this.fb.group({
      description: [null, Validators.required],
      value: [null, [Validators.required, Validators.min(0)]],
      discount: [null, Validators.required],
      tempCode: [null, Validators.required],
    });
  }
}
