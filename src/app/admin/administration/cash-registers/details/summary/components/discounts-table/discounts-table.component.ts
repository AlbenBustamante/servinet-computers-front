import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { DetailService } from '../../../services/detail.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-discounts-table',
  templateUrl: './discounts-table.component.html',
})
export class DiscountsTableComponent {
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
      return reports?.transactions.discounts;
    }),
    noDataMessage: 'Parece que aún no cuenta con gastos por descontar',
  };

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly service: DetailService
  ) {
    this.reports = this.service.reports;
  }
}
