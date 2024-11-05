import { Component, signal } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.css'],
})
export class MainStatsComponent {
  readonly totalBalance = signal<number | undefined>(undefined);

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        this.totalBalance.set(dashboard.totalBalance);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
