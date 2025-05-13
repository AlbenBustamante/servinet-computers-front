import { Component, computed, signal, ViewChild } from '@angular/core';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';
import { MyHomeService } from '@services/my-home.service';
import { TransactionDetailService } from '@services/transaction-detail.service';
import { TransactionService } from '@services/transaction.service';
import { TempCodeFormComponent } from '@shared/components/temp-code-form/temp-code-form.component';
import { UpdateTransactionDetailFormComponent } from './components/update-transaction-detail-form/update-transaction-detail-form.component';
import { IUpdateTransactionDetailDto } from '@models/transaction.model';
import { IPagination } from '@models/response.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  @ViewChild(UpdateTransactionDetailFormComponent)
  updateTransactionDetailForm!: UpdateTransactionDetailFormComponent;
  @ViewChild(TempCodeFormComponent) tempCodeForm!: TempCodeFormComponent;

  readonly showSideBarUpdate = signal<boolean>(false);
  readonly showSideBarDelete = signal<boolean>(false);
  readonly transactionDetailToUpdateId = signal<number>(-1);
  readonly transactionDetailToDeleteId = signal<number>(-1);
  readonly updateLoading = signal<boolean>(false);
  readonly deleteLoading = signal<boolean>(false);
  readonly paginationLoading;
  readonly pagination;
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
    this.pagination = this.myHomeService.pagination;
    this.details = this.myHomeService.details;
    this.loading = this.myHomeService.loading;
    this.transactions = this.myHomeService.transactions;
    this.paginationLoading = this.myHomeService.paginationLoading;
  }

  ngOnInit() {
    this.loading.set(true);

    const cashRegisterDetailId =
      this.myCashService.currentCashRegister()!.cashRegisterDetail.id;

    this.cashRegisterDetailService
      .getTransactions(cashRegisterDetailId)
      .subscribe({
        next: (transactions) => {
          this.pagination.set(transactions.page);
          this.details.set(transactions.content);
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

  onSelectPage(page: number) {
    this.paginationLoading.set(true);

    const { id } = this.myCashService.currentCashRegister()!.cashRegisterDetail;

    this.cashRegisterDetailService.getTransactions(id, page).subscribe({
      next: (transactions) => {
        this.pagination.set(transactions.page);
        this.details.set(transactions.content);
        this.paginationLoading.set(false);
      },
      error: (err) => {
        this.paginationLoading.set(false);
        console.log(err);
      },
    });
  }

  tableOnEdit(id: number) {
    this.transactionDetailToUpdateId.set(id);
    this.showSideBarUpdate.set(true);
  }

  tableOnRemove(id: number) {
    this.transactionDetailToDeleteId.set(id);
    this.showSideBarDelete.set(true);
  }

  update(dto: IUpdateTransactionDetailDto) {
    this.updateLoading.set(true);

    this.transactionDetailService
      .update(this.transactionDetailToUpdateId(), dto)
      .subscribe({
        next: (detail) => {
          this.details.update((prevValue) => {
            const index = prevValue.findIndex((d) => d.id === detail.id);

            if (index > -1) {
              prevValue[index] = detail;
            }

            return prevValue;
          });

          this.showSideBarUpdate.set(false);
          this.updateLoading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.updateLoading.set(false);
        },
      });
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
