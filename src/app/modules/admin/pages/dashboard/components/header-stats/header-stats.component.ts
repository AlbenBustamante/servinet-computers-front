import { Component } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.css'],
})
export class HeaderStatsComponent {
  readonly dashboard;

  constructor(private readonly dashboardService: DashboardService) {
    this.dashboard = this.dashboardService.dashboard;
  }
}
