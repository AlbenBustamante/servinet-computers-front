import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly open = signal<boolean | undefined>(undefined);

  constructor(
    private readonly myCashService: MyCashService,
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const open = !!this.myCashService.currentCashRegister();

    if (open) {
      return;
    }

    this.cashRegisterDetailService.alreadyExists().subscribe({
      next: (alreadyExists) => {
        this.open.set(alreadyExists.alreadyExists);

        if (alreadyExists.alreadyExists) {
          this.myCashService.currentCashRegister.set(
            alreadyExists.myCashRegisters.cashRegisterDetailsReports[0]
          );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToOpenCash() {
    this.router.navigateByUrl('/portal/cajas');
  }
}
