import { Component, computed } from '@angular/core';
import { DetailService } from '@admin/administration/cash-registers/details/services/detail.service';

@Component({
  selector: 'app-cashier-stats',
  templateUrl: './cashier-stats.component.html',
})
export class CashierStatsComponent {
  readonly reports;
  readonly loading;

  readonly fullName = computed(() => {
    const reports = this.reports();
    if (!reports) {
      return '';
    }
    const { name, lastName } = reports.reports.cashRegisterDetail.user;
    return `${name} ${lastName}`;
  });

  constructor(private readonly service: DetailService) {
    this.reports = this.service.reports;
    this.loading = this.service.loading;
  }
}
