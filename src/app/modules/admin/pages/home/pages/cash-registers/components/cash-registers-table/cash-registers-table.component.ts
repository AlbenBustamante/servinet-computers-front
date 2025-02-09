import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-cash-registers-table',
  templateUrl: './cash-registers-table.component.html',
  styleUrls: ['./cash-registers-table.component.css'],
})
export class CashRegistersTableComponent {
  readonly loading = signal<boolean>(false);
  readonly cashRegisters;

  constructor(
    private readonly cashRegisterService: CashRegisterService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.cashRegisters = this.cashRegisterService.cashRegisters;
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterService.getAll().subscribe({
      next: (_) => {
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  goToMovements(id: number) {
    this.router.navigate([id, 'movimientos'], { relativeTo: this.route });
  }
}
