import { Component } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-platforms-stats',
  templateUrl: './platforms-stats.component.html',
  styleUrls: ['./platforms-stats.component.css'],
})
export class PlatformsStatsComponent {
  readonly dashboard;

  constructor(private readonly dashboardService: DashboardService) {
    this.dashboard = this.dashboardService.dashboard;
  }
}
