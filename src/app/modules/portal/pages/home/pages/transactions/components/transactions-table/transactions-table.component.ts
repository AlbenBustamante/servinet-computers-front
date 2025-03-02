import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MyHomeService } from '@services/my-home.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { TransactionDetailTypePipe } from '@shared/pipes/transaction-detail-type.pipe';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent {
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
    body: this.myHomeService.details,
    noDataMessage: '¡Ten una buena jornada!',
  };

  constructor(private readonly myHomeService: MyHomeService) {}
}
