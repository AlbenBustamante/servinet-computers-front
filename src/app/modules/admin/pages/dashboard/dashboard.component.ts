import { Component, signal, WritableSignal } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
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
