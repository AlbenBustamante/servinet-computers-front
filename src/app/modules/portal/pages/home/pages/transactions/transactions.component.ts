import { Component } from '@angular/core';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';
import { MyHomeService } from '@services/my-home.service';
import { TransactionService } from '@services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  readonly loading;
  readonly transactions;

  constructor(
    private readonly myTransactionsService: MyHomeService,
    private readonly myCashService: MyCashService,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {
    this.transactions = this.myTransactionsService.transactions;
    this.loading = this.myTransactionsService.loading;
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
