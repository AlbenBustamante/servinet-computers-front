import { Component } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-cash-registers-stats-table',
  templateUrl: './cash-registers-stats-table.component.html',
  styleUrls: ['./cash-registers-stats-table.component.css'],
})
export class CashRegistersStatsTableComponent {
  readonly dashboard;

  constructor(private readonly dashboardService: DashboardService) {
    this.dashboard = this.dashboardService.dashboard;
  }
}
