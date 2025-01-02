import { Component, signal } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { AdmItemCardOptions } from '../../components/adm-item-card/adm-item-card.component';

@Component({
  selector: 'app-admin-cash-registers',
  templateUrl: './cash-registers.component.html',
  styleUrls: ['./cash-registers.component.css'],
})
export class CashRegistersComponent {
  readonly loading = signal<boolean>(false);
  readonly cashRegisterDetails = signal<ICashRegisterDetailRes[]>([]);

  readonly options: AdmItemCardOptions = [];

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {}

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterDetailService.getAllOfToday().subscribe({
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

  setSelectedCashRegisterDetail(index: number) {}
}
