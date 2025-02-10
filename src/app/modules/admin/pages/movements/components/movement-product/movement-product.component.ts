import { Component, Input } from '@angular/core';
import { Product } from '@models/movements.model';
import { MovementsService } from '@services/movements.service';

@Component({
  selector: 'app-movement-product',
  templateUrl: './movement-product.component.html',
  styleUrls: ['./movement-product.component.css'],
})
export class MovementProductComponent {
  @Input({ required: true }) product!: Product;
  readonly selectedProduct;
  readonly setSelectedProduct;

  constructor(private readonly movementsService: MovementsService) {
    this.selectedProduct = this.movementsService.selectedProduct;
    this.setSelectedProduct = this.movementsService.setSelectedProduct;
  }
}
