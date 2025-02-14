import { Component, Input } from '@angular/core';
import { IExpenseRes } from '@models/expense.model';

@Component({
  selector: 'app-discounts-table',
  templateUrl: './discounts-table.component.html',
  styleUrls: ['./discounts-table.component.css'],
})
export class DiscountsTableComponent {
  @Input({ required: true }) discounts!: IExpenseRes[];
}
