import { Component, Input } from '@angular/core';
import { ICashRegisterRes } from '@models/cash-register.model';
import { ProductType } from '@models/movements.model';
import { ISafeRes } from '@models/safe.model';

@Component({
  selector: 'app-movement-product-registries-list',
  templateUrl: './movement-product-registries-list.component.html',
  styleUrls: ['./movement-product-registries-list.component.css'],
})
export class MovementProductRegistriesListComponent {
  @Input({ required: true }) selectedProduct!: ProductType;
  @Input({ required: true }) cashRegisters!: ICashRegisterRes[];
  @Input({ required: true }) safes!: ISafeRes[];
}
