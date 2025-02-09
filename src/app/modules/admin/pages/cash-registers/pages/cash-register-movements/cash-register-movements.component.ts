import { Component, Input, signal } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-cash-register-movements',
  templateUrl: './cash-register-movements.component.html',
  styleUrls: ['./cash-register-movements.component.css'],
})
export class CashRegisterMovementsComponent {
  @Input() id!: number;
  readonly loading = signal<boolean>(false);
  readonly cashRegisterDetails = signal<ICashRegisterDetailRes[]>([]);
  readonly title = signal<string>('');

  constructor(private readonly cashRegisterService: CashRegisterService) {}

  ngOnInit() {
    this.title.set(`Movimientos de Caja Registradora N° ${this.id}`);
    this.loading.set(true);

    this.cashRegisterService.getMovements(this.id).subscribe({
      next: (cashRegisterDetails) => {
        this.cashRegisterDetails.set(cashRegisterDetails);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
