import { Component } from '@angular/core';
import { DetailService } from '@admin/home/cash-registers/details/services/detail.service';

@Component({
  selector: 'app-base-stats',
  templateUrl: './base-stats.component.html',
})
export class BaseStatsComponent {
  readonly loading;
  readonly reports;

  constructor(private readonly service: DetailService) {
    this.loading = this.service.loading;
    this.reports = this.service.reports;
  }
}
