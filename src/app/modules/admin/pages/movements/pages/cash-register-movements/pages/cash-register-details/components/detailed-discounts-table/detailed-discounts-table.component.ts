import { Component, computed, Input } from '@angular/core';
import { IExpenseRes } from '@models/expense.model';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-detailed-discounts-table',
  templateUrl: './detailed-discounts-table.component.html',
  styleUrls: ['./detailed-discounts-table.component.css'],
})
export class DetailedDiscountsTableComponent {
  @Input({ required: true }) discounts!: IExpenseRes[] | undefined;

  readonly table: ITable = {
    header: [],
    body: computed(() => this.discounts),
    noDataMessage: 'Parece que aún no tiene gastos a descontar',
  };
}
