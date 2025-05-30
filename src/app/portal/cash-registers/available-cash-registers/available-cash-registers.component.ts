import { Component, signal } from '@angular/core';
import { ICashRegisterRes } from '@models/cash-register.model';
import { CashRegisterService } from '@services/cash-register.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-available-cash-registers',
  templateUrl: './available-cash-registers.component.html',
})
export class AvailableCashRegistersComponent {
  private readonly cashRegisterStatus;

  readonly loading = signal<boolean>(false);
  readonly cashRegisters;

  constructor(
    private readonly myCashService: MyCashService,
    private readonly cashRegisterService: CashRegisterService
  ) {
    this.cashRegisters = this.myCashService.cashRegisters;
    this.cashRegisterStatus = this.myCashService.cashRegisterStatus;
  }

  ngOnInit() {
    if (this.cashRegisters().length > 0) {
      return;
    }

    this.loading.set(true);

    this.cashRegisterService.getAll().subscribe({
      next: (cashRegisters) => {
        this.cashRegisters.set(cashRegisters);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  openCash(cashRegister: ICashRegisterRes) {
    this.myCashService.setSelectedCashRegister(cashRegister);
    this.cashRegisterStatus.set('entry-time');
  }
}
