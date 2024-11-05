import { Component, signal } from '@angular/core';

type SelectedProduct = 'platforms' | 'cash-registers' | 'safes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  readonly selectedProduct = signal<SelectedProduct>('platforms');

  handleSelectedProduct(selectedProduct: SelectedProduct) {
    this.selectedProduct.set(selectedProduct);
  }
}
