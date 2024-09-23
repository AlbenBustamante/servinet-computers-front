import { Component, signal } from '@angular/core';
import { IBase } from '@models/base.model';
import { ICashRegisterDetailReq } from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-base-cash',
  templateUrl: './base-cash.component.html',
  styleUrls: ['./base-cash.component.css'],
})
export class BaseCashComponent {
  private readonly myCashRegisters;
  private readonly cashRegisterStatus;

  readonly loading = signal<boolean>(false);
  readonly selectedCashRegister;

  constructor(
    private readonly myCashService: MyCashService,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {
    this.myCashRegisters = this.myCashService.myCashRegisters;
    this.cashRegisterStatus = this.myCashService.cashRegisterStatus;
    this.selectedCashRegister = this.myCashService.getSelectedCashRegister();
  }

  setBase(base: IBase) {
    this.myCashService.initialBase = base;
  }

  setObservation(observation: string) {
    this.myCashService.observation = observation;
  }

  register() {
    this.loading.set(true);

    const workingHours = [this.myCashService.workingHours, '', '', ''];

    const detailReq: ICashRegisterDetailReq = {
      cashRegisterId: this.selectedCashRegister()!.id,
      workingHours: workingHours,
      initialBase: this.myCashService.initialBase!,
      baseObservation: this.myCashService.observation,
    };

    this.cashRegisterDetailService.register(detailReq).subscribe({
      next: (myCashRegistersReports) => {
        this.myCashRegisters.set(myCashRegistersReports);
        this.myCashService.clear();
        this.cashRegisterStatus.set('open');
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  onReturn() {
    this.myCashService.removeInitialBase();
    this.myCashService.removeObservation();
    this.cashRegisterStatus.set('entry-time');
  }
}
