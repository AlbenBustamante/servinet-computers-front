import { Injectable, signal } from '@angular/core';
import { faCashRegister, faHardDrive } from '@fortawesome/free-solid-svg-icons';
import { ICashRegisterRes } from '@models/cash-register.model';
import { ProductType, Product } from '@models/movements.model';
import { ISafeRes } from '@models/safe.model';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  readonly faCashRegisters = faCashRegister;
  readonly faSafes = faHardDrive;
  readonly selectedProduct = signal<ProductType>('Cajas Registradoras');
  readonly cashRegisters = signal<ICashRegisterRes[]>([]);
  readonly safes = signal<ISafeRes[]>([]);

  readonly products = signal<Product[]>([
    {
      title: 'Cajas Registradoras',
      icon: this.faCashRegisters,
    },
    {
      title: 'Cajas Fuertes',
      icon: this.faSafes,
    },
  ]);

  constructor() {}

  setSelectedProduct(product: ProductType) {
    this.selectedProduct.set(product);
  }
}
