import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { CashRegisterDetailMovementService } from '@services/cash-register-detail-movement.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-detailed-expenses-table',
  templateUrl: './detailed-expenses-table.component.html',
  styleUrls: ['./detailed-expenses-table.component.css'],
})
export class DetailedExpensesTableComponent {
  readonly expenses;
  readonly table: ITable;

  constructor(
    private readonly cashRegisterDetailMovementService: CashRegisterDetailMovementService
  ) {
    this.expenses = computed(
      () =>
        this.cashRegisterDetailMovementService.movement()?.transactions.expenses
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
      body: this.expenses,
      noDataMessage: 'Parece que aún no tiene gastos realizados',
    };
  }
}
