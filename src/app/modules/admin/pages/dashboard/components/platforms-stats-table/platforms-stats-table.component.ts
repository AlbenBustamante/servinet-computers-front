import { Component } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-platforms-stats-table',
  templateUrl: './platforms-stats-table.component.html',
  styleUrls: ['./platforms-stats-table.component.css'],
})
export class PlatformsStatsTableComponent {
  readonly dashboard;

  constructor(private readonly dashboardService: DashboardService) {
    this.dashboard = this.dashboardService.dashboard;
  }
}
