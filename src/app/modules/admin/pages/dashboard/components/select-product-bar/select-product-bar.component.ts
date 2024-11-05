import { Component } from '@angular/core';
import { DashboardService, SelectedProduct } from '@services/dashboard.service';

@Component({
  selector: 'app-select-product-bar',
  templateUrl: './select-product-bar.component.html',
  styleUrls: ['./select-product-bar.component.css'],
})
export class SelectProductBarComponent {
  readonly selectedProduct;

  constructor(private readonly dashboardService: DashboardService) {
    this.selectedProduct = this.dashboardService.selectedProduct;
  }

  handleSelectedProduct(selectedProduct: SelectedProduct) {
    this.selectedProduct.set(selectedProduct);
  }
}
