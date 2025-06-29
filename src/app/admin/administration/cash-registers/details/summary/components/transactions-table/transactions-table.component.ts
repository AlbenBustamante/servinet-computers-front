import { CurrencyPipe, DatePipe } from '@angular/common';
import { DetailService } from '../../../services/detail.service';
import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { TransactionDetailTypePipe } from '@shared/pipes/transaction-detail-type.pipe';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
})
export class TransactionsTableComponent {
  readonly reports;
  readonly table: ITable = {
    header: [
      {
        key: 'id',
        title: 'ID',
        align: 'center',
      },
      {
        key: 'description',
        title: 'Descripción',
      },
      {
        key: 'type',
        title: 'Tipo',
        pipe: new TransactionDetailTypePipe(),
      },
      {
        key: 'value',
        title: 'Valor',
        pipe: new CurrencyPipe(this.locale),
        align: 'right',
      },
      {
        key: 'commission',
        title: 'Adicional',
        pipe: new CurrencyPipe(this.locale),
        align: 'right',
      },
      {
        key: 'date',
        title: 'Hora',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
    ],
    body: computed(() => {
      const reports = this.reports();
      return reports?.transactions.transactions;
    }),
    noDataMessage: 'Parece que aún no cuenta con transacciones',
  };

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly service: DetailService
  ) {
    this.reports = this.service.reports;
  }
}
