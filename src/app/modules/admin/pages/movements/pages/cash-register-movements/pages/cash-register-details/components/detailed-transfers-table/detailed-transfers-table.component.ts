import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { ICashTransferDto } from '@models/cash-transfer.model';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-detailed-transfers-table',
  templateUrl: './detailed-transfers-table.component.html',
  styleUrls: ['./detailed-transfers-table.component.css'],
})
export class DetailedTransfersTableComponent {
  @Input({ required: true }) transfers!: ICashTransferDto[] | undefined;

  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      {
        key: 'value',
        title: 'Valor',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
        prefixSign: true,
      },
      { key: 'senderOrReceiver', title: 'Servicio' },
      {
        key: 'createdDate',
        title: 'Hora',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortTime',
      },
    ],
    body: computed(() => this.transfers),
    noDataMessage: 'Parece que aún no tiene transferencias',
  };
}
