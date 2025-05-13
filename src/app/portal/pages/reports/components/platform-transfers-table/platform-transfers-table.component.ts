import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { IPlatformTransferRes } from '@models/platform.model';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-platform-transfers-table',
  templateUrl: './platform-transfers-table.component.html',
  styleUrls: ['./platform-transfers-table.component.css'],
})
export class PlatformTransfersTableComponent {
  @Input({ required: true }) platformTransfers!: IPlatformTransferRes[];

  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'platform.name', title: 'Plataforma' },
      {
        key: 'value',
        title: 'Valor',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
      },
      { key: 'voucherUrls.length', title: 'Comprobantes', align: 'center' },
      {
        key: 'createdDate',
        title: 'Hora',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortTime',
      },
    ],
    body: computed(() => this.platformTransfers),
    noDataMessage: 'Parece que no has hecho transferencias entre plataformas',
  };
}
