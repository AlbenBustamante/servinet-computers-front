import { Component } from '@angular/core';
import { DetailService } from '@admin/administration/cash-registers/details/services/detail.service';

@Component({
  selector: 'app-journey-stats',
  templateUrl: './journey-stats.component.html',
})
export class JourneyStatsComponent {
  readonly loading;
  readonly reports;

  constructor(private readonly service: DetailService) {
    this.loading = this.service.loading;
    this.reports = this.service.reports;
  }
}
