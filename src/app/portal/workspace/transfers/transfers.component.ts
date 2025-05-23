import { Component, signal, ViewChild } from '@angular/core';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { CashTransferService } from '@services/cash-transfer.service';
import { MyCashService } from '@services/my-cash.service';
import { MyHomeService } from '@services/my-home.service';
import { TempCodeFormComponent } from '@shared/components/temp-code-form/temp-code-form.component';
import { zip } from 'rxjs';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent {
  @ViewChild(TempCodeFormComponent) tempCodeForm!: TempCodeFormComponent;
  private readonly onRemoveId = signal<number>(-1);
  readonly showDeleteSideBar = signal<boolean>(false);
  readonly deleteLoading = signal<boolean>(false);
  readonly loading;
  readonly availableTransfers;
  readonly cashTransfers;
  readonly pagination;
  readonly paginationLoading;

  constructor(
    private readonly cashTransferService: CashTransferService,
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly myHomeService: MyHomeService,
    private readonly myCashService: MyCashService
  ) {
    this.loading = this.myHomeService.loading;
    this.availableTransfers = this.myHomeService.availableTransfers;
    this.cashTransfers = this.myHomeService.cashTransfers;
    this.pagination = this.myHomeService.pagination;
    this.paginationLoading = this.myHomeService.paginationLoading;
  }

  ngOnInit() {
    this.loading.set(true);

    const { cashRegisterDetail } = this.myCashService.currentCashRegister()!;

    const calls = zip(
      this.cashTransferService.getAvailableTransfers(),
      this.cashRegisterDetailService.getCashTransfers(cashRegisterDetail.id)
    );

    calls.subscribe({
      next: ([availableTransfers, cashTransfers]) => {
        this.availableTransfers.set(availableTransfers);
        this.cashTransfers.set(cashTransfers.content);
        this.pagination.set(cashTransfers.page);
        this.loading.set(false);
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

    this.cashRegisterDetailService.getCashTransfers(id, page).subscribe({
      next: (cashTransfers) => {
        this.pagination.set(cashTransfers.page);
        this.cashTransfers.set(cashTransfers.content);
        this.paginationLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.paginationLoading.set(false);
      },
    });
  }

  onRemove(index: number) {
    this.onRemoveId.set(index);
    this.showDeleteSideBar.set(true);
  }

  delete(tempCode: string) {
    this.deleteLoading.set(true);

    const { id } = this.myCashService.currentCashRegister()!.cashRegisterDetail;

    this.cashTransferService.delete(this.onRemoveId(), id, tempCode).subscribe({
      next: () => {
        this.cashTransfers.update((prevValue) => {
          const index = prevValue.findIndex(
            (ct) => ct.id === this.onRemoveId()
          );

          if (index > -1) {
            prevValue.splice(index, 1);
          }

          return prevValue;
        });

        this.deleteLoading.set(false);
        this.showDeleteSideBar.set(false);
      },
      error: (err) => {
        console.log(err);
        this.deleteLoading.set(false);
      },
    });
  }
}
