import { Component, computed, ViewChild } from '@angular/core';
import { CashRegisterBaseService } from '@services/cash-register-base.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { DetailService } from '@admin/administration/cash-registers/details/services/detail.service';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { IBase } from '@models/base.model';
import { ICloseCashRegisterDetailDto } from '@models/cash-register.model';

@Component({
  selector: 'app-close-cash-register-base-modal',
  templateUrl: './close-cash-register-base-modal.component.html',
})
export class CloseCashRegisterBaseModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  readonly reports;
  readonly loading;
  readonly timeForm;

  readonly headline = computed(() => {
    const reports = this.reports();
    return `Cierre de Caja N° ${
      reports?.reports.cashRegisterDetail.cashRegister?.numeral ?? 0
    }`;
  });

  constructor(
    private readonly service: DetailService,
    private readonly cashRegisterBaseService: CashRegisterBaseService,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {
    this.reports = this.service.reports;
    this.loading = this.service.loading;
    this.timeForm = this.service.timeForm;
  }

  onSubmit() {
    if (this.timeForm.invalid) {
      return this.timeForm.markAllAsTouched();
    }

    const form = this.cashRegisterBaseService.form;

    if (form.invalid) {
      return form.markAllAsTouched();
    }

    this.loading.set(true);

    const { id } = this.reports()!.reports.cashRegisterDetail;

    const closeCashRegisterDetail: ICloseCashRegisterDetailDto = {
      base: form.value as unknown as IBase,
      time: this.timeForm.value.time as unknown as Date,
    };

    this.cashRegisterDetailService
      .close(id, closeCashRegisterDetail)
      .subscribe({
        next: (reports) => {
          this.reports.update((prevValue) => {
            prevValue!.reports = reports;
            return prevValue;
          });
          this.onClose();
          this.loading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.loading.set(false);
        },
      });
  }

  open() {
    this.modal.open();
  }

  onClose() {
    this.cashRegisterBaseService.resetBase();
    this.modal.close();
  }
}
