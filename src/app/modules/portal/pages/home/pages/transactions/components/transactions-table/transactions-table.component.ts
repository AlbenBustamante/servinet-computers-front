import { Component, signal } from '@angular/core';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';
import { MyTransactionsService } from '@services/my-transactions.service';
import { TransactionService } from '@services/transaction.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent {
  readonly loading = signal<boolean>(false);
  readonly transactions;

  constructor(
    private readonly myTransactionsService: MyTransactionsService,
    private readonly myCashService: MyCashService,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {
    this.transactions = this.myTransactionsService.transactions;
  }

  ngOnInit() {
    this.loading.set(true);

    const cashRegisterDetailId =
      this.myCashService.currentCashRegister()!.cashRegisterDetail.id;

    this.cashRegisterDetailService
      .getTransactions(cashRegisterDetailId)
      .subscribe({
        next: (transactions) => {
          this.transactions.set(transactions);
          this.loading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.loading.set(false);
        },
      });
  }
}
