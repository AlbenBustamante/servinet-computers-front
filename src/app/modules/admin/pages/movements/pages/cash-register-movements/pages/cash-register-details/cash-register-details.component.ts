import { Component, Input, signal, ViewChild } from '@angular/core';
import { IDetailedCashRegisterReportsDto } from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { CashRegisterDetailsModalComponent } from './components/cash-register-details-modal/cash-register-details-modal.component';

@Component({
  selector: 'app-cash-register-details',
  templateUrl: './cash-register-details.component.html',
  styleUrls: ['./cash-register-details.component.css'],
})
export class CashRegisterDetailsComponent {
  @ViewChild(CashRegisterDetailsModalComponent)
  modal!: CashRegisterDetailsModalComponent;
  @Input() id!: number;
  readonly loading = signal<boolean>(false);
  readonly reports = signal<IDetailedCashRegisterReportsDto | undefined>(
    undefined
  );

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {}

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterDetailService.getDetailedReports(this.id).subscribe({
      next: (reports) => {
        this.reports.set(reports);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  openModal() {
    this.modal.open();
  }
}
