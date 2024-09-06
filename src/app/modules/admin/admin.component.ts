import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.authService.getLoggedIn().subscribe();

    if (!this.dashboardService.totalBalance()) {
      this.dashboardService.getDashboard().subscribe();
    }
  }
}
