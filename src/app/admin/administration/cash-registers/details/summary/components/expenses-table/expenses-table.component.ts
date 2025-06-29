import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
import { DetailService } from '../../../services/detail.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
})
export class ExpensesTableComponent {
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
        key: 'value',
        title: 'Valor',
        pipe: new CurrencyPipe(this.locale),
        align: 'right',
      },
      {
        key: 'createdDate',
        title: 'Hora',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
    ],
    body: computed(() => {
      const reports = this.reports();
      return reports?.transactions.expenses;
    }),
    noDataMessage: 'Parece que aún no cuenta con gastos de caja',
  };

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly service: DetailService
  ) {
    this.reports = this.service.reports;
  }
}
