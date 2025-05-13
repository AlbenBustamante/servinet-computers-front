import { Component, signal } from '@angular/core';
import { CashRegisterService } from '@services/cash-register.service';
import { MovementsService } from '@services/movements.service';
import { SafeService } from '@services/safe.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css'],
})
export class MovementsComponent {
  readonly loading = signal<boolean>(false);
  readonly selectedProduct;
  readonly products;
  readonly cashRegisters;
  readonly safes;

  constructor(
    private readonly movementsService: MovementsService,
    private readonly cashRegisterService: CashRegisterService,
    private readonly safeService: SafeService
  ) {
    this.selectedProduct = this.movementsService.selectedProduct;
    this.products = this.movementsService.products;
    this.cashRegisters = this.cashRegisterService.cashRegisters;
    this.safes = this.movementsService.safes;
  }

  ngOnInit() {
    this.loading.set(true);

    zip(this.cashRegisterService.getAll(), this.safeService.getAll()).subscribe(
      ([cashRegisters, safes]) => {
        this.cashRegisters.set(cashRegisters);
        this.safes.set(safes);
        this.loading.set(false);
      }
    );
  }
}
