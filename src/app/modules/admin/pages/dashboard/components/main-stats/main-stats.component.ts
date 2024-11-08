import { Component } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.css'],
})
export class MainStatsComponent {
  readonly dashboard;

  constructor(private readonly dashboardService: DashboardService) {
    this.dashboard = this.dashboardService.dashboard;
  }
}
