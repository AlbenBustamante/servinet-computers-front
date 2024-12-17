import { Injectable, signal } from '@angular/core';
import { IExpenseRes } from '@models/expense.model';
import { ITransactionDetailRes } from '@models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class MyHomeService {
  readonly loading = signal<boolean>(false);
  readonly expenses = signal<IExpenseRes[]>([]);
  readonly transactions = signal<ITransactionDetailRes[]>([]);
  readonly descriptions = signal<string[]>([]);

  constructor() {}
}
