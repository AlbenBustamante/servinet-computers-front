import { Component } from '@angular/core';
import { MyHomeService } from '@services/my-home.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css'],
})
export class ExpensesTableComponent {
  readonly expenses;

  constructor(private readonly myHomeService: MyHomeService) {
    this.expenses = this.myHomeService.expenses;
  }
}
