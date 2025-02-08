import { Component, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBaseDetail } from '@models/base.model';
import { BaseService } from '@services/base.service';
import { CashRegisterBaseService } from '@services/cash-register-base.service';

@Component({
  selector: 'app-update-cash-register-base-form',
  templateUrl: './update-cash-register-base-form.component.html',
  styleUrls: ['./update-cash-register-base-form.component.css'],
})
export class UpdateCashRegisterBaseFormComponent {
  readonly baseDetail = signal<IBaseDetail | undefined>(undefined);
  readonly base;
  readonly form: FormGroup;

  constructor(
    private readonly baseService: BaseService,
    private readonly cashRegisterBaseService: CashRegisterBaseService
  ) {
    this.form = this.cashRegisterBaseService.form;
    this.base = this.baseService.cashBase;

    this.base.set(this.baseService.defaultBase());
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const { total } = this.baseService.calculate(this.form);
    this.baseDetail.set(total);
  }
}
