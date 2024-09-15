import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-cash-registers',
  templateUrl: './cash-registers.component.html',
  styleUrls: ['./cash-registers.component.css'],
})
export class CashRegistersComponent {
  private readonly routes = {
    open: './mis-cajas',
    selecting: './seleccion',
    'entry-time': './apertura/hora-entrada',
    counting: './apertura/base',
  };

  private readonly cashRegisterStatus;
  private readonly cashRegisters;
  private readonly myCashRegisters;

  readonly loading = signal<boolean>(false);

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly myCashService: MyCashService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.cashRegisterStatus = this.myCashService.cashRegisterStatus;
    this.cashRegisters = this.myCashService.cashRegisters;
    this.myCashRegisters = this.myCashService.myCashRegisters;

    effect(() => {
      if (this.cashRegisterStatus()) {
        this.router.navigate([this.routes[this.cashRegisterStatus()!]], {
          relativeTo: this.route,
        });
      }
    });
  }

  ngOnInit() {
    if (this.cashRegisterStatus()) {
      return;
    }

    if (this.myCashService.observation || this.myCashService.initialBase) {
      return this.cashRegisterStatus.set('counting');
    }

    if (this.myCashService.workingHours) {
      return this.cashRegisterStatus.set('entry-time');
    }

    this.loading.set(true);

    this.cashRegisterDetailService.alreadyExists().subscribe({
      next: (res) => {
        if (res.alreadyExists) {
          this.cashRegisterStatus.set('open');
          this.myCashRegisters.set(res.myCashRegisters);
        } else {
          this.cashRegisterStatus.set('selecting');
          this.cashRegisters.set(res.availableCashRegisters);
        }

        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        console.log(error);
      },
    });
  }
}
