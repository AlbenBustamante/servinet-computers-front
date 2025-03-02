import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MyHomeService } from '@services/my-home.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-cash-transfers-table',
  templateUrl: './cash-transfers-table.component.html',
  styleUrls: ['./cash-transfers-table.component.css'],
})
export class CashTransfersTableComponent {
  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'senderOrReceiver', title: 'Servicio' },
      {
        key: 'value',
        title: 'Valor',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
        prefixSign: true,
      },
      {
        key: 'createdDate',
        title: 'Hora',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortTime',
      },
    ],
    body: this.myHomeService.cashTransfers,
    noDataMessage: 'Parece que aún no tienes transferencias',
  };

  constructor(private readonly myHomeService: MyHomeService) {}
}
