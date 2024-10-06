import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { CashRegisterService } from '@services/cash-register.service';
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
    'final-base': './cierre/base-final',
    'final-report': './cierre/reporte-final',
  };

  private readonly cashRegisterStatus;
  private readonly cashRegisters;
  private readonly myCashRegisters;

  readonly loading = signal<boolean>(false);

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly cashRegisterService: CashRegisterService,
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

    const expired = this.myCashService.isExpired();

    if (!expired) {
      return this.redirect();
    }

    if (expired) {
      this.alreadyExists();
    }
  }

  private alreadyExists() {
    this.loading.set(true);

    this.myCashService.clear();

    this.cashRegisterDetailService.alreadyExists().subscribe({
      next: (res) => {
        if (res.alreadyExists) {
          this.myCashService.removeExpirationTime();
          this.cashRegisterStatus.set('open');
          this.myCashRegisters.set(res.myCashRegisters);
        } else {
          this.myCashService.initTime();
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

  private redirect() {
    if (this.myCashService.observation || this.myCashService.initialBase) {
      return this.cashRegisterStatus.set('counting');
    }

    if (this.myCashService.initialWorking) {
      return this.cashRegisterStatus.set('entry-time');
    }

    if (this.myCashService.closing) {
      return this.cashRegisterStatus.set('final-base');
    }

    if (this.myCashService.getClosedReports()) {
      return this.cashRegisterStatus.set('final-report');
    }

    this.loading.set(true);

    this.cashRegisterService.getAll().subscribe({
      next: (cashRegisters) => {
        this.cashRegisters.set(cashRegisters);
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
