import { Component, Input, signal, ViewChild } from '@angular/core';
import { IDetailedCashRegisterReportsDto } from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { CashRegisterDetailsModalComponent } from './components/cash-register-details-modal/cash-register-details-modal.component';
import { CashRegisterDetailMovementService } from '@services/cash-register-detail-movement.service';

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
  readonly movement;

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly cashRegisterDetailMovementService: CashRegisterDetailMovementService
  ) {
    this.movement = this.cashRegisterDetailMovementService.movement;
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterDetailService.getDetailedReports(this.id).subscribe({
      next: (reports) => {
        this.movement.set(reports);
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
    return this.movement()?.reports;
  }

  get cashier() {
    const user = this.reports?.cashRegisterDetail.user;
    return user ? `${user.name} ${user.lastName} - ${user.code}` : '';
  }

  get details() {
    return this.movement()?.reports.cashRegisterDetail;
  }
}
