import { Component } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-safes-stats-table',
  templateUrl: './safes-stats-table.component.html',
  styleUrls: ['./safes-stats-table.component.css'],
})
export class SafesStatsTableComponent {
  readonly dashboard;

  constructor(private readonly dashboardService: DashboardService) {
    this.dashboard = this.dashboardService.dashboard;
  }
}
