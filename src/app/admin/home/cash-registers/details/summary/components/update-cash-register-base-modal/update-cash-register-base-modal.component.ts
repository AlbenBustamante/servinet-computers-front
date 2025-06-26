import { Component, computed, ViewChild } from '@angular/core';
import { CashRegisterBaseService } from '@services/cash-register-base.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { DetailService } from '../../../services/detail.service';
import { IBase } from '@models/base.model';
import { IUpdateCashRegisterDetailBaseDto } from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';

@Component({
  selector: 'app-update-cash-register-base-modal',
  templateUrl: './update-cash-register-base-modal.component.html',
  styleUrls: ['./update-cash-register-base-modal.component.css'],
})
export class UpdateCashRegisterBaseModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  readonly reports;
  readonly initial;

  readonly headline = computed(() => {
    const initial = this.initial();
    const reports = this.reports();
    const cashRegister = reports?.reports.cashRegisterDetail.cashRegister;

    return `Base ${initial ? 'Inicial' : 'Final'} de Caja Registradora N° ${
      cashRegister?.numeral ?? 0
    }`;
  });

  constructor(
    private readonly service: DetailService,
    private readonly cashRegisterBaseService: CashRegisterBaseService,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {
    this.reports = this.service.reports;
    this.initial = this.service.initial;
  }

  onSubmit() {
    const form = this.cashRegisterBaseService.form;

    if (form.invalid) {
      return form.markAllAsTouched();
    }

    const { id } = this.reports()!.reports.cashRegisterDetail;

    const dto: IUpdateCashRegisterDetailBaseDto = {
      base: form.value as unknown as IBase,
      initial: this.initial(),
    };

    this.cashRegisterDetailService.updateBase(id, dto).subscribe({
      next: (cashRegisterDetail) => {
        this.reports.update((prevValue) => {
          prevValue!.reports.cashRegisterDetail = cashRegisterDetail;
          return prevValue;
        });

        this.onClose();
      },
      error: (err) => {
        console.error(err);
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
