import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPlatformRes } from '@models/platform.model';

@Component({
  selector: 'app-new-bank-deposit-payment-form',
  templateUrl: './new-bank-deposit-payment-form.component.html',
})
export class NewBankDepositPaymentFormComponent {
  @Output() onSubmit = new EventEmitter<void>();
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) platforms!: IPlatformRes[];
  @Input({ required: true }) loading!: boolean;

  emitOnSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.onSubmit.emit();
  }
}
