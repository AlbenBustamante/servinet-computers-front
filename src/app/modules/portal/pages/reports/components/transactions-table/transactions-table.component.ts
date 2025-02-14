import { Component, Input } from '@angular/core';
import { ITransactionDetailRes } from '@models/transaction.model';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent {
  @Input({ required: true }) transactions!: ITransactionDetailRes[];
}
