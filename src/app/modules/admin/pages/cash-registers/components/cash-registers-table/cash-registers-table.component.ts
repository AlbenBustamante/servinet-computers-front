import { Component, signal } from '@angular/core';
import { ICashRegisterRes } from '@models/cash-register.model';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-cash-registers-table',
  templateUrl: './cash-registers-table.component.html',
  styleUrls: ['./cash-registers-table.component.css'],
})
export class CashRegistersTableComponent {
  readonly loading = signal<boolean>(false);
  readonly cashRegisters = signal<ICashRegisterRes[]>([]);

  constructor(private readonly cashRegisterService: CashRegisterService) {}

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterService.getAll().subscribe({
      next: (cashRegisters) => {
        this.cashRegisters.set(cashRegisters);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
