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
  readonly details;
  readonly transactions;

  constructor(
    private readonly myHomeService: MyHomeService,
    private readonly myCashService: MyCashService,
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly transactionService: TransactionService
  ) {
    this.details = this.myHomeService.details;
    this.loading = this.myHomeService.loading;
    this.transactions = this.myHomeService.transactions;
  }

  ngOnInit() {
    this.loading.set(true);

    const cashRegisterDetailId =
      this.myCashService.currentCashRegister()!.cashRegisterDetail.id;

    this.cashRegisterDetailService
      .getTransactions(cashRegisterDetailId)
      .subscribe({
        next: (transactions) => {
          this.details.set(transactions);
          this.transactionService.getAll().subscribe({
            next: (descriptions) => {
              this.transactions.set(descriptions);
              this.loading.set(false);
            },
            error: (err) => {
              console.log(err);
              this.loading.set(false);
            },
          });
        },
        error: (err) => {
          console.log(err);
          this.loading.set(false);
        },
      });
  }
}
