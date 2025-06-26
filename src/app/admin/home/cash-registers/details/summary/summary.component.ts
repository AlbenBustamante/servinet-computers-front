import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from '@admin/home/cash-registers/details/services/detail.service';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent {
  private readonly id: number;
  readonly loading;
  readonly reports;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: DetailService,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('detailId'));
    this.loading = this.service.loading;
    this.reports = this.service.reports;
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterDetailService.getReportsAndMovements(this.id).subscribe({
      next: (reports) => {
        this.reports.set(reports);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
