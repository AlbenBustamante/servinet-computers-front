import { Component, computed, signal } from '@angular/core';
import { ICashRegisterDetailReportsDto } from '@models/cash-register.model';
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
  readonly selectedCashRegister = signal<
    ICashRegisterDetailReportsDto | undefined
  >(undefined);
  readonly selectedCashRegisterIndex = signal<number>(0);

  readonly selectedCashRegisterBreakTitle = computed(() => {
    const cashRegisterDetail = this.selectedCashRegister()?.cashRegisterDetail!;

    if (
      cashRegisterDetail.initialBreak !== '--:--' &&
      cashRegisterDetail.finalBreak === '--:--'
    ) {
      return 'Retomar jornada';
    }

    if (
      cashRegisterDetail.initialBreak === '--:--' &&
      cashRegisterDetail.finalBreak === '--:--'
    ) {
      return 'Tomar descanso';
    }

    return '';
  });

  constructor(
    private readonly myCashService: MyCashService,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {
    this.myCashRegisters = this.myCashService.myCashRegisters;
    this.selectedCashRegister.set(
      this.myCashRegisters()?.cashRegisterDetailsReports[0]
    );
  }

  handleSelectedCashRegister(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    if (value === 'all') {
      return this.selectedCashRegister.set(
        this.myCashRegisters()?.finalReport!
      );
    }

    const index = Number(value);

    this.selectedCashRegisterIndex.set(index);

    this.selectedCashRegister.set(
      this.myCashRegisters()?.cashRegisterDetailsReports[index]!
    );
  }

  handleTakeBreak() {
    this.selectedCashRegisterBreakTitle() === 'Tomar descanso'
      ? this.startBreak()
      : this.endBreak();
  }

  private startBreak() {
    this.breakLoading.set(true);

    const cashRegisterDetailId =
      this.selectedCashRegister()?.cashRegisterDetail.id;

    this.cashRegisterDetailService.startBreak(cashRegisterDetailId!).subscribe({
      next: (cashRegisterDetail) => {
        this.selectedCashRegister.update((prevValue) => {
          prevValue!.cashRegisterDetail = cashRegisterDetail;

          return prevValue;
        });

        this.myCashRegisters.update((cashRegisters) => {
          cashRegisters!.cashRegisterDetailsReports[
            this.selectedCashRegisterIndex()
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
      this.selectedCashRegister()?.cashRegisterDetail.id;

    this.cashRegisterDetailService.endBreak(cashRegisterDetailId!).subscribe({
      next: (cashRegisterDetail) => {
        this.selectedCashRegister.update((prevValue) => {
          prevValue!.cashRegisterDetail = cashRegisterDetail;

          return prevValue;
        });

        this.myCashRegisters.update((cashRegisters) => {
          cashRegisters!.cashRegisterDetailsReports[
            this.selectedCashRegisterIndex()
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
}
