import { Injectable, signal } from '@angular/core';
import { IExpenseRes } from '@models/expense.model';
import { ITransactionDetailRes } from '@models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class MyTransactionsService {
  readonly expenses = signal<IExpenseRes[]>([]);
  readonly transactions = signal<ITransactionDetailRes[]>([]);

  constructor() {}
}
