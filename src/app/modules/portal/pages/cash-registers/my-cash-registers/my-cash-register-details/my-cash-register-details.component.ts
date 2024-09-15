import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICashRegisterDetailReportsDto } from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';

@Component({
  selector: 'app-my-cash-register-details',
  templateUrl: './my-cash-register-details.component.html',
  styleUrls: ['./my-cash-register-details.component.css'],
})
export class MyCashRegisterDetailsComponent {
  readonly loading = signal<boolean>(false);
  readonly reports = signal<ICashRegisterDetailReportsDto | undefined>(
    undefined
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {}

  ngOnInit() {
    this.loading.set(true);

    this.route.params.subscribe({
      next: (params) => {
        const cashRegisterDetailId = params['id'];

        this.cashRegisterDetailService
          .getReports(cashRegisterDetailId)
          .subscribe({
            next: (reports) => {
              this.reports.set(reports);
              this.loading.set(false);
            },
            error: (err) => {
              console.log(err);
              this.loading.set(false);
            },
          });
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
