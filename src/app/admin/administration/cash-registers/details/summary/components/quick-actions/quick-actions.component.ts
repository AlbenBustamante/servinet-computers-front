import { Component, computed, ViewChild } from '@angular/core';
import { DetailService } from '@admin/administration/cash-registers/details/services/detail.service';
import { CashRegisterBaseService } from '@services/cash-register-base.service';
import { UpdateCashRegisterBaseModalComponent } from '@admin/administration/cash-registers/details/summary/components/update-cash-register-base-modal/update-cash-register-base-modal.component';
import { CloseCashRegisterBaseModalComponent } from '@admin/administration/cash-registers/details/summary/components/close-cash-register-base-modal/close-cash-register-base-modal.component';
import { CashRegisterDetailStatus } from '@models/enums';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
})
export class QuickActionsComponent {
  @ViewChild(UpdateCashRegisterBaseModalComponent)
  updateBaseModal!: UpdateCashRegisterBaseModalComponent;
  @ViewChild(CloseCashRegisterBaseModalComponent)
  closeModal!: CloseCashRegisterBaseModalComponent;

  readonly reports;
  readonly initial;

  readonly closed = computed(() => {
    const reports = this.reports();

    if (!reports) {
      return false;
    }

    const { status } = reports.reports.cashRegisterDetail;

    return status === CashRegisterDetailStatus.CLOSED;
  });

  constructor(
    private readonly service: DetailService,
    private readonly cashRegisterBaseService: CashRegisterBaseService
  ) {
    this.reports = this.service.reports;
    this.initial = this.service.initial;
  }

  openUpdateInitialBaseModal() {
    this.initial.set(true);
    const { detailInitialBase } = this.reports()!.reports.cashRegisterDetail;
    this.cashRegisterBaseService.calculate(detailInitialBase);
    this.updateBaseModal.open();
  }

  openUpdateFinalBaseModal() {
    this.initial.set(false);
    const { detailFinalBase } = this.reports()!.reports.cashRegisterDetail;
    this.cashRegisterBaseService.calculate(detailFinalBase);
    this.updateBaseModal.open();
  }
}
