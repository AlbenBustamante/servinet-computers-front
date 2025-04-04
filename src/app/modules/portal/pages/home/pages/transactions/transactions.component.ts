import { Component, signal, ViewChild } from '@angular/core';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';
import { MyHomeService } from '@services/my-home.service';
import { TransactionDetailService } from '@services/transaction-detail.service';
import { TransactionService } from '@services/transaction.service';
import { TempCodeFormComponent } from '@shared/components/temp-code-form/temp-code-form.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  @ViewChild(TempCodeFormComponent) tempCodeForm!: TempCodeFormComponent;
  readonly showSideBarUpdate = signal<boolean>(false);
  readonly showSideBarDelete = signal<boolean>(false);
  readonly transactionDetailToDeleteId = signal<number>(-1);
  readonly deleteLoading = signal<boolean>(false);
  readonly loading;
  readonly details;
  readonly transactions;

  constructor(
    private readonly myHomeService: MyHomeService,
    private readonly myCashService: MyCashService,
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly transactionService: TransactionService,
    private readonly transactionDetailService: TransactionDetailService
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

  onDeleteTable(id: number) {
    this.transactionDetailToDeleteId.set(id);
    this.showSideBarDelete.set(true);
  }

  delete(code: string) {
    this.deleteLoading.set(true);

    this.transactionDetailService
      .delete(this.transactionDetailToDeleteId(), Number(code))
      .subscribe({
        next: () => {
          this.details.update((prevValue) => {
            const index = prevValue.findIndex(
              (detail) => detail.id === this.transactionDetailToDeleteId()
            );

            if (index > -1) {
              prevValue.splice(index, 1);
            }

            return prevValue;
          });

          this.showSideBarDelete.set(false);
          this.deleteLoading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.deleteLoading.set(false);
        },
      });
  }
}
