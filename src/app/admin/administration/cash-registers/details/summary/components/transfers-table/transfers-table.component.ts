import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
import { DetailService } from '../../../services/detail.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
})
export class TransfersTableComponent {
  readonly reports;
  readonly table: ITable = {
    header: [
      {
        key: 'id',
        title: 'ID',
        align: 'center',
      },
      {
        key: 'senderOrReceiver',
        title: 'Servicio',
      },
      {
        key: 'value',
        title: 'Valor',
        pipe: new CurrencyPipe(this.locale),
        align: 'right',
        prefixSign: true,
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
      return reports?.transactions.transfers;
    }),
    noDataMessage: 'Parece que aún no cuenta con transferencias entre cajas',
  };

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly service: DetailService
  ) {
    this.reports = this.service.reports;
  }
}
