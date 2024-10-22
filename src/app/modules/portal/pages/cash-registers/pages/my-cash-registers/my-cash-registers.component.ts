import { Component, computed, signal } from '@angular/core';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-my-cash-registers',
  templateUrl: './my-cash-registers.component.html',
  styleUrls: ['./my-cash-registers.component.css'],
})
export class MyCashRegistersComponent {
  readonly breakLoading = signal<boolean>(false);
  readonly myCashRegisters;
  readonly currentCashRegister;
  readonly currentCashRegisterIndex = signal<number>(0);
  readonly faRefresh = faRefresh;
  readonly refreshLoading = signal<boolean>(false);

  readonly myCurrentCashRegisterBreakTitle = computed(() => {
    const cashRegisterDetail = this.currentCashRegister()?.cashRegisterDetail;

    if (!cashRegisterDetail) {
      return '';
    }

    if (
      cashRegisterDetail.initialBreak !== null &&
      cashRegisterDetail.finalBreak === null
    ) {
      return 'Retomar jornada';
    }

    if (
      cashRegisterDetail.initialBreak === null &&
      cashRegisterDetail.finalBreak === null
    ) {
      return 'Tomar descanso';
    }

    return '';
  });

  readonly showCloseButton = computed(() => {
    const currentCashRegister = this.currentCashRegister();

    return currentCashRegister?.cashRegisterDetail.finalWorking === null;
  });

  constructor(
    private readonly myCashService: MyCashService,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {
    this.myCashService.clear();
    this.myCashRegisters = this.myCashService.myCashRegisters;
    this.currentCashRegister = this.myCashService.currentCashRegister;
    this.currentCashRegister.set(
      this.myCashRegisters()!.cashRegisterDetailsReports[0]
    );
  }

  handleSelectedCashRegister(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    if (value === 'all') {
      return this.currentCashRegister.set(this.myCashRegisters()?.finalReport!);
    }

    const index = Number(value);

    this.currentCashRegisterIndex.set(index);

    this.currentCashRegister.set(
      this.myCashRegisters()?.cashRegisterDetailsReports[index]!
    );
  }

  refresh() {
    this.refreshLoading.set(true);

    const id = this.currentCashRegister()!.cashRegisterDetail.id;

    this.cashRegisterDetailService.getReports(id).subscribe({
      next: (reports) => {
        this.currentCashRegister.set(reports);
        this.refreshLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.refreshLoading.set(false);
      },
    });
  }

  handleTakeBreak() {
    this.myCurrentCashRegisterBreakTitle() === 'Tomar descanso'
      ? this.startBreak()
      : this.endBreak();
  }

  private startBreak() {
    this.breakLoading.set(true);

    const cashRegisterDetailId =
      this.currentCashRegister()?.cashRegisterDetail.id;

    this.cashRegisterDetailService.startBreak(cashRegisterDetailId!).subscribe({
      next: (cashRegisterDetail) => {
        this.currentCashRegister.update((prevValue) => {
          prevValue!.cashRegisterDetail = cashRegisterDetail;

          return prevValue;
        });

        this.myCashRegisters.update((cashRegisters) => {
          cashRegisters!.cashRegisterDetailsReports[
            this.currentCashRegisterIndex()
          ].cashRegisterDetail;

          return cashRegisters;
        });

        this.breakLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.breakLoading.set(false);
      },
    });
  }

  private endBreak() {
    this.breakLoading.set(true);

    const cashRegisterDetailId =
      this.currentCashRegister()?.cashRegisterDetail.id;

    this.cashRegisterDetailService.endBreak(cashRegisterDetailId!).subscribe({
      next: (cashRegisterDetail) => {
        this.currentCashRegister.update((prevValue) => {
          prevValue!.cashRegisterDetail = cashRegisterDetail;

          return prevValue;
        });

        this.myCashRegisters.update((cashRegisters) => {
          cashRegisters!.cashRegisterDetailsReports[
            this.currentCashRegisterIndex()
          ].cashRegisterDetail;

          return cashRegisters;
        });

        this.breakLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.breakLoading.set(false);
      },
    });
  }

  close() {
    this.myCashService.closing = true;
    this.myCashService.myClosingCashRegister.set(
      this.currentCashRegister()?.cashRegisterDetail
    );
    this.myCashService.cashRegisterStatus.set('final-base');
  }
}
