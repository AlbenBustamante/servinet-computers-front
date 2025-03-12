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
  readonly detailedReports = signal<
    IDetailedCashRegisterReportsDto | undefined
  >(undefined);

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {}

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterDetailService.getDetailedReports(this.id).subscribe({
      next: (reports) => {
        this.detailedReports.set(reports);
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

  get reports() {
    return this.detailedReports()?.reports;
  }

  get cashier() {
    const user = this.reports?.cashRegisterDetail.user;
    return user ? `${user.name} ${user.lastName}` : '';
  }

  get details() {
    return this.detailedReports()?.reports.cashRegisterDetail;
  }
}
