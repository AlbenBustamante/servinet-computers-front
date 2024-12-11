import { Injectable, signal } from '@angular/core';
import { IExpenseRes } from '@models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class MyTransactionsService {
  readonly expenses = signal<IExpenseRes[]>([]);

  constructor() {}
}
