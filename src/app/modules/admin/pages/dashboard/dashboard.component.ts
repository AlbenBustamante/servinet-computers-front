import { Component } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  readonly selectedProduct;

  constructor(private readonly dashboardService: DashboardService) {
    this.selectedProduct = this.dashboardService.selectedProduct;
  }

  ngOnInit() {
    this.dashboardService.getDashboard().subscribe({
      next: (_) => {},
      error: (err) => {
        console.log(err);
      },
    });
  }
}
