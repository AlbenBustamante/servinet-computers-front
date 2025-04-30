import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { CashRegisterDetailMovementService } from '@services/cash-register-detail-movement.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-detailed-discounts-table',
  templateUrl: './detailed-discounts-table.component.html',
  styleUrls: ['./detailed-discounts-table.component.css'],
})
export class DetailedDiscountsTableComponent {
  readonly discounts;
  readonly table: ITable;

  constructor(
    private readonly cashRegisterDetailMovementService: CashRegisterDetailMovementService
  ) {
    this.discounts = computed(
      () =>
        this.cashRegisterDetailMovementService.movement()?.transactions
          .discounts
    );

    this.table = {
      header: [
        { key: 'id', title: 'ID', align: 'center' },
        { key: 'description', title: 'Nota' },
        {
          key: 'value',
          title: 'Valor',
          align: 'right',
          pipe: new CurrencyPipe('es-CO'),
        },
        {
          key: 'createdDate',
          title: 'Hora',
          pipe: new DatePipe('es-CO'),
          pipeArgs: 'shortTime',
        },
      ],
      body: this.discounts,
      noDataMessage: 'Parece que aún no tiene gastos a descontar',
    };
  }
}
