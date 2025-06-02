import { Component } from '@angular/core';
import { DetailService } from '@admin/home/safes/services/detail.service';

@Component({
  selector: 'app-detail-main-stats',
  templateUrl: './detail-main-stats.component.html',
})
export class DetailMainStatsComponent {
  readonly loading;
  readonly details;

  constructor(private readonly detailService: DetailService) {
    this.loading = this.detailService.loading;
    this.details = this.detailService.details;
  }
}
