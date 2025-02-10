import { Component, Input } from '@angular/core';
import { Product } from '@models/movements.model';

@Component({
  selector: 'app-movement-products-list',
  templateUrl: './movement-products-list.component.html',
  styleUrls: ['./movement-products-list.component.css'],
})
export class MovementProductsListComponent {
  @Input({ required: true }) products!: Product[];
}
