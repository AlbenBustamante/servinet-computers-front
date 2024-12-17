import { Component, signal } from '@angular/core';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';
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
