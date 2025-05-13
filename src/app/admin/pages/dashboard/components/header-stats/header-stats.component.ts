import { Component } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.css'],
})
export class HeaderStatsComponent {
  date = '';
  readonly dashboard;

  constructor(private readonly dashboardService: DashboardService) {
    this.dashboard = this.dashboardService.dashboard;
  }

  setDate() {
    // this.loading.set(true);

    this.dashboardService.getDashboard(this.date).subscribe({
      next: (_) => {},
      error: (err) => {
        console.error(err);
      },
    });
  }
}
