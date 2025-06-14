import { Component } from '@angular/core';
import { DetailService } from '@admin/home/cash-registers/details/services/detail.service';

@Component({
  selector: 'app-hours-stats',
  templateUrl: './hours-stats.component.html',
})
export class HoursStatsComponent {
  readonly loading;
  readonly detail;

  constructor(private readonly service: DetailService) {
    this.loading = this.service.loading;
    this.detail = this.service.selectedDetail;
  }
}
