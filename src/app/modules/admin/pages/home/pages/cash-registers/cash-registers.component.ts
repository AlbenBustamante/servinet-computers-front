import { Component, signal } from '@angular/core';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-cash-registers',
  templateUrl: './cash-registers.component.html',
  styleUrls: ['./cash-registers.component.css'],
})
export class CashRegistersComponent {
  readonly loading = signal<boolean>(false);

  constructor(private readonly cashRegisterService: CashRegisterService) {}

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
}
