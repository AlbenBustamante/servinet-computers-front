import { Component } from '@angular/core';
import { DetailService } from '@admin/home/cash-registers/details/services/detail.service';

@Component({
  selector: 'app-base-stats',
  templateUrl: './base-stats.component.html',
})
export class BaseStatsComponent {
  readonly loading;
  readonly detail;

  constructor(private readonly service: DetailService) {
    this.loading = this.service.loading;
    this.detail = this.service.selectedDetail;
  }
}
