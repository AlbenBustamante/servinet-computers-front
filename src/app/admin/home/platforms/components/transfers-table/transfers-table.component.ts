import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { PlatformDetailService } from '../../services/platform-detail.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
  styleUrls: ['./transfers-table.component.css'],
})
export class TransfersTableComponent {
  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      {
        key: 'value',
        title: 'Valor',
        align: 'right',
        pipe: new CurrencyPipe(this.locale),
      },
      {
        key: 'date',
        title: 'Fecha',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortDate',
      },
    ],
    body: this.platformDetailService.transfers,
    noDataMessage: 'No se han realizado transferencias',
  };

  constructor(
    private readonly platformDetailService: PlatformDetailService,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {}
}
