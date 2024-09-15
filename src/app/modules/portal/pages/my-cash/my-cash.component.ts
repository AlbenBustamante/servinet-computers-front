import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-my-cash',
  templateUrl: './my-cash.component.html',
  styleUrls: ['./my-cash.component.css'],
})
export class MyCashComponent {
  private readonly routes = {
    open: './caja-abierta',
    selecting: './seleccion',
    'entry-time': './apertura/hora-entrada',
    counting: './apertura/base',
  };

  private readonly cashRegisterStatus;
  private readonly cashRegisters;
  private readonly myCash;

  readonly loading = signal<boolean>(false);

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly myCashService: MyCashService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.cashRegisterStatus = this.myCashService.cashRegisterStatus;
    this.cashRegisters = this.myCashService.cashRegisters;
    this.myCash = this.myCashService.myCash;

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
          this.myCash.set(res.cashRegisterDetail);
        } else {
          this.cashRegisterStatus.set('selecting');
          this.cashRegisters.set(res.cashRegisters);
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
