import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-bank-deposit-form',
  templateUrl: './new-bank-deposit-form.component.html',
  styleUrls: ['./new-bank-deposit-form.component.css'],
})
export class NewBankDepositFormComponent {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();
  @Input({ required: true }) form!: FormGroup;
  readonly faCancel = faTrashAlt;

  emitOnSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.onSubmit.emit();
  }

  emitOnCancel() {
    this.form.reset();
    this.onCancel.emit();
  }
}
