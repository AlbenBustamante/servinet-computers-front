import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { CashRegisterDetailMovementService } from '@services/cash-register-detail-movement.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-detailed-transfers-table',
  templateUrl: './detailed-transfers-table.component.html',
  styleUrls: ['./detailed-transfers-table.component.css'],
})
export class DetailedTransfersTableComponent {
  readonly transfers;
  readonly table: ITable;

  constructor(
    private readonly cashRegisterDetailMovementService: CashRegisterDetailMovementService
  ) {
    this.transfers = computed(
      () =>
        this.cashRegisterDetailMovementService.movement()?.transactions
          .transfers
    );

    this.table = {
      header: [
        { key: 'id', title: 'ID', align: 'center' },
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
      body: this.transfers,
      noDataMessage: 'Parece que aún no tiene transferencias',
    };
  }
}
