import { Component } from '@angular/core';
import { DetailService } from '../../../services/detail.service';

@Component({
  selector: 'app-aperture-stats',
  templateUrl: './aperture-stats.component.html',
})
export class ApertureStatsComponent {
  readonly reports;
  readonly loading;

  constructor(private readonly service: DetailService) {
    this.reports = this.service.reports;
    this.loading = this.service.loading;
  }
}
