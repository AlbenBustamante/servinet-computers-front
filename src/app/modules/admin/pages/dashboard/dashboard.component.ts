import { Component, WritableSignal } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  readonly totalBalance: WritableSignal<number | undefined>;

  constructor(private readonly dashboardService: DashboardService) {
    this.totalBalance = this.dashboardService.totalBalance;
  }
}
