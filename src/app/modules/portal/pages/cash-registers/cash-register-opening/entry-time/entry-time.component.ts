import { Component, signal } from '@angular/core';
import { CashRegisterService } from '@services/cash-register.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-entry-time',
  templateUrl: './entry-time.component.html',
  styleUrls: ['./entry-time.component.css'],
})
export class EntryTimeComponent {
  private readonly cashRegisterStatus;
  private readonly cashRegisters;

  readonly loading = signal<boolean>(false);

  constructor(
    private readonly myCashService: MyCashService,
    private readonly cashRegisterService: CashRegisterService
  ) {
    this.cashRegisterStatus = this.myCashService.cashRegisterStatus;
    this.cashRegisters = this.myCashService.cashRegisters;
  }

  setWorkingHours(initialWorking: string) {
    if (initialWorking === '') {
      return;
    }

    this.myCashService.workingHours = `${initialWorking};;;`;

    this.cashRegisterStatus.set('counting');
  }

  onReturn() {
    this.loading.set(true);

    this.cashRegisterService.getAll().subscribe({
      next: (cashRegisters) => {
        this.cashRegisters.set(cashRegisters);

        this.myCashService.removeWorkingHours();
        this.myCashService.removeSelectedCashRegister();
        this.cashRegisterStatus.set('selecting');

        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
