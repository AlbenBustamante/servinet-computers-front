import { Component } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  readonly selectedProduct;
  readonly loading;

  constructor(private readonly dashboardService: DashboardService) {
    this.selectedProduct = this.dashboardService.selectedProduct;
    this.loading = this.dashboardService.loading;
  }

  ngOnInit() {
    this.loading.set(true);

    this.dashboardService.getDashboard(undefined).subscribe({
      next: (_) => {
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
