import { Component, Input } from '@angular/core';
import { IExpenseRes } from '@models/expense.model';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css'],
})
export class ExpensesTableComponent {
  @Input({ required: true }) expenses!: IExpenseRes[];
}
