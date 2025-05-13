import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { ITransactionDetailRes } from '@models/transaction.model';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { TransactionDetailTypePipe } from '@shared/pipes/transaction-detail-type.pipe';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent {
  @Input({ required: true }) transactions!: ITransactionDetailRes[];

  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'description', title: 'Nota' },
      { key: 'type', title: 'Tipo', pipe: new TransactionDetailTypePipe() },
      {
        key: 'value',
        title: 'Valor',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
      },
      {
        key: 'commission',
        title: 'Adicional',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
      },
      {
        key: 'date',
        title: 'Hora',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortTime',
      },
    ],
    body: computed(() => this.transactions),
    noDataMessage: 'Parece que aún no tienes transacciones',
  };
}
