import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movement-product-registry',
  templateUrl: './movement-product-registry.component.html',
  styleUrls: ['./movement-product-registry.component.css'],
})
export class MovementProductRegistryComponent {
  @Input({ required: true }) route!: string;
  @Input({ required: true }) id!: number;
}
