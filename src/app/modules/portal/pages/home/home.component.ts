import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-portal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly loading = signal<boolean>(false);
  readonly open = signal<boolean | undefined>(undefined);

  constructor(
    private readonly myCashService: MyCashService,
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loading.set(true);

    const open = !!this.myCashService.currentCashRegister();

    if (open) {
      this.open.set(open);
      return this.loading.set(false);
    }

    this.cashRegisterDetailService.alreadyExists().subscribe({
      next: (alreadyExists) => {
        this.open.set(alreadyExists.alreadyExists);

        if (this.open()) {
          this.myCashService.currentCashRegister.set(
            alreadyExists.myCashRegisters.cashRegisterDetailsReports[0]
          );
        }

        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  goToOpenCash() {
    this.router.navigateByUrl('/portal/cajas');
  }
}
