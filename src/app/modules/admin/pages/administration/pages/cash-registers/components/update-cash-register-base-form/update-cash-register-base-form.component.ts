import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBase } from '@models/base.model';
import { BaseService } from '@services/base.service';
import { CashRegisterBaseService } from '@services/cash-register-base.service';

@Component({
  selector: 'app-update-cash-register-base-form',
  templateUrl: './update-cash-register-base-form.component.html',
  styleUrls: ['./update-cash-register-base-form.component.css'],
})
export class UpdateCashRegisterBaseFormComponent {
  @Output() setBase = new EventEmitter<IBase>();
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

    const base = this.form.value as IBase;
    this.baseService.calculate(this.form);
    this.setBase.emit(base);
  }
}
