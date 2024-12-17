import { Component } from '@angular/core';
import { MyHomeService } from '@services/my-home.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent {
  readonly loading;
  readonly transactions;

  constructor(private readonly myTransactionsService: MyHomeService) {
    this.transactions = this.myTransactionsService.transactions;
    this.loading = this.myTransactionsService.loading;
  }
}
