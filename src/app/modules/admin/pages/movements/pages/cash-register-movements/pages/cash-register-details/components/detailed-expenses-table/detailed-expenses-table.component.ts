import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { IExpenseRes } from '@models/expense.model';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-detailed-expenses-table',
  templateUrl: './detailed-expenses-table.component.html',
  styleUrls: ['./detailed-expenses-table.component.css'],
})
export class DetailedExpensesTableComponent {
  @Input({ required: true }) expenses!: IExpenseRes[] | undefined;

  readonly table: ITable = {
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
    body: computed(() => this.expenses),
    noDataMessage: 'Parece que aún no tiene gastos realizados',
  };
}
