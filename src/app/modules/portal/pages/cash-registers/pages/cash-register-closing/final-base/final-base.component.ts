import { Component, signal } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IBase } from '@models/base.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-final-base',
  templateUrl: './final-base.component.html',
  styleUrls: ['./final-base.component.css'],
})
export class FinalBaseComponent {
  readonly faReturn = faArrowLeft;
  readonly finalBase = signal<IBase | undefined>(undefined);
  readonly loading = signal<boolean>(false);

  constructor(
    private readonly myCashService: MyCashService,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {}

  setBase(base: IBase) {
    this.finalBase.set(base);
  }

  onReturn() {
    this.myCashService.removeClosingCashRegister();
    this.myCashService.cashRegisterStatus.set('open');
  }

  close() {
    this.loading.set(true);

    const cashRegisterDetailId = this.myCashService.closingCashRegister;

    this.cashRegisterDetailService
      .close(cashRegisterDetailId, this.finalBase()!)
      .subscribe({
        next: (reports) => {
          this.myCashService.setClosedReports(reports);
          this.myCashService.cashRegisterStatus.set('final-report');
          this.loading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.loading.set(false);
        },
      });
  }
}
